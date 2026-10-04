"use client";

import { Crosshair, House, LocateFixed, RotateCcw } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import type {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  Popup as MapLibrePopup,
} from "maplibre-gl";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-data";
import type { GalleryItem } from "@/lib/content-types";
import { isValidLngLat } from "@/lib/map-coordinates";

type MapMode = "picker" | "treated" | "hq";

type MapCanvasProps = {
  mode: MapMode;
  locations?: GalleryItem[];
  fitLocations?: GalleryItem[];
  coordinates?: [number, number];
  onCoordinatesChange?: (coordinates: [number, number]) => void;
  onLocationSelect?: (location: GalleryItem) => void;
  className?: string;
};

const philippinesCenter: [number, number] = [122.5, 12.4];
const noLocations: GalleryItem[] = [];

function createTreatedPopupContent(location: GalleryItem, expanded: boolean) {
  const article = document.createElement("article");
  article.className = expanded
    ? "treated-map-popup is-expanded"
    : "treated-map-popup";

  const label = document.createElement("span");
  label.className = "treated-map-popup-label";
  label.textContent = expanded
    ? "Treated property details"
    : "Treated property";
  article.append(label);

  const title = document.createElement("strong");
  title.textContent = location.title;
  article.append(title);

  const place = document.createElement("span");
  place.className = "treated-map-popup-location";
  place.textContent = location.generalLocation;
  article.append(place);

  if (expanded) {
    const meta = document.createElement("div");
    meta.className = "treated-map-popup-meta";
    [
      location.servicePerformed,
      location.propertyType,
      String(location.year),
    ].forEach((value) => {
      const item = document.createElement("span");
      item.textContent = value;
      meta.append(item);
    });
    article.append(meta);

    const description = document.createElement("p");
    description.textContent = location.shortDescription;
    article.append(description);

    const link = document.createElement("a");
    link.className = "treated-map-popup-link";
    link.href = `/gallery/${encodeURIComponent(location.slug)}`;
    link.textContent = "View more";
    article.append(link);
  } else {
    const hint = document.createElement("small");
    hint.textContent = "Click the house marker for details";
    article.append(hint);
  }

  return article;
}

function defaultMapStyle(cartoBasemapKey?: string) {
  const keyQuery = cartoBasemapKey
    ? `?key=${encodeURIComponent(cartoBasemapKey)}`
    : "";

  return {
    version: 8 as const,
    sources: {
      carto: {
        type: "raster" as const,
        tiles: [
          `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png${keyQuery}`,
        ],
        tileSize: 256,
        minzoom: 0,
        maxzoom: 20,
        attribution:
          '<a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">© CARTO</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>',
      },
    },
    layers: [{ id: "carto-voyager", type: "raster" as const, source: "carto" }],
  };
}

export function MapCanvas({
  mode,
  locations,
  fitLocations,
  coordinates,
  onCoordinatesChange,
  onLocationSelect,
  className = "",
}: MapCanvasProps) {
  const locationMessageId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const initialCoordinatesRef = useRef(coordinates);
  const mapRef = useRef<MapLibreMap | null>(null);
  const mapLibraryRef = useRef<typeof import("maplibre-gl") | null>(null);
  const markerRef = useRef<MapLibreMarker | null>(null);
  const popupRef = useRef<MapLibrePopup | null>(null);
  const coordinateCallbackRef = useRef(onCoordinatesChange);
  const selectionCallbackRef = useRef(onLocationSelect);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [locating, setLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const locationData = locations ?? noLocations;
  const framingData = fitLocations ?? locationData;

  useEffect(() => {
    coordinateCallbackRef.current = onCoordinatesChange;
  }, [onCoordinatesChange]);
  useEffect(() => {
    selectionCallbackRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let localMap: MapLibreMap | null = null;
    const renderedMarkers: MapLibreMarker[] = [];
    const markerRoots: Root[] = [];

    async function initializeMap() {
      try {
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        mapLibraryRef.current = maplibregl;
        const initialCenter =
          initialCoordinatesRef.current ??
          (mode === "hq" ? siteConfig.hqCoordinates : philippinesCenter);
        const configuredStyle = process.env.NEXT_PUBLIC_MAP_STYLE_URL;
        const cartoBasemapKey =
          process.env.NEXT_PUBLIC_CARTO_BASEMAP_KEY?.trim();
        localMap = new maplibregl.Map({
          container: containerRef.current,
          style: configuredStyle || defaultMapStyle(cartoBasemapKey),
          center: initialCenter,
          zoom: mode === "hq" ? 13 : initialCoordinatesRef.current ? 14 : 5.2,
          pitch: mode === "treated" ? 44 : 0,
          bearing: mode === "treated" ? -12 : 0,
          attributionControl: false,
        });
        mapRef.current = localMap;
        localMap.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true }),
          "top-right",
        );
        localMap.addControl(
          new maplibregl.AttributionControl({ compact: true }),
          "bottom-right",
        );

        localMap.on("load", () => {
          if (cancelled || !localMap) return;
          setStatus("ready");

          if (mode === "picker" || mode === "hq") {
            const pin =
              initialCoordinatesRef.current ?? siteConfig.hqCoordinates;
            const markerElement = document.createElement("button");
            markerElement.type = "button";
            markerElement.className = "dmsa-map-marker cursor-pointer";
            markerElement.setAttribute(
              "aria-label",
              mode === "picker"
                ? "Selected property location"
                : "DMSA headquarters",
            );
            markerElement.innerHTML = '<span aria-hidden="true"></span>';
            markerRef.current = new maplibregl.Marker({
              element: markerElement,
              draggable: mode === "picker",
            })
              .setLngLat(pin)
              .addTo(localMap);
            if (mode === "picker") {
              markerRef.current.on("dragend", () => {
                const point = markerRef.current?.getLngLat();
                if (point)
                  coordinateCallbackRef.current?.([point.lng, point.lat]);
              });
            }
          }

          if (mode === "treated") {
            const bounds = new maplibregl.LngLatBounds();
            let popupMode: "hover" | "detail" | null = null;

            const closePopup = () => {
              popupRef.current?.remove();
              popupRef.current = null;
              popupMode = null;
            };

            locationData.forEach((location) => {
              const markerElement = document.createElement("button");
              markerElement.type = "button";
              markerElement.className = "treated-map-marker cursor-pointer";
              markerElement.setAttribute(
                "aria-label",
                `View treated property details for ${location.title} in ${location.generalLocation}`,
              );
              markerElement.title = `${location.title} — ${location.generalLocation}`;

              const markerRoot = createRoot(markerElement);
              markerRoot.render(<House aria-hidden="true" />);
              markerRoots.push(markerRoot);

              const marker = new maplibregl.Marker({
                element: markerElement,
                anchor: "bottom",
              })
                .setLngLat(location.coordinates)
                .addTo(localMap!);
              renderedMarkers.push(marker);

              const showPreview = () => {
                if (
                  !localMap ||
                  popupMode === "detail" ||
                  !window.matchMedia("(hover: hover)").matches
                )
                  return;
                closePopup();
                popupMode = "hover";
                popupRef.current = new maplibregl.Popup({
                  closeButton: false,
                  closeOnClick: false,
                  focusAfterOpen: false,
                  offset: 24,
                })
                  .setLngLat(location.coordinates)
                  .setDOMContent(createTreatedPopupContent(location, false))
                  .addTo(localMap);
              };

              const hidePreview = () => {
                if (popupMode === "hover") closePopup();
              };

              const showDetails = (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (!localMap) return;
                closePopup();
                popupMode = "detail";
                const popup = new maplibregl.Popup({
                  closeButton: true,
                  closeOnClick: false,
                  focusAfterOpen: false,
                  offset: 24,
                  maxWidth: "300px",
                })
                  .setLngLat(location.coordinates)
                  .setDOMContent(createTreatedPopupContent(location, true))
                  .addTo(localMap);
                popup.on("close", () => {
                  if (popupRef.current === popup) popupRef.current = null;
                  popupMode = null;
                });
                popupRef.current = popup;
                selectionCallbackRef.current?.(location);
              };

              markerElement.addEventListener("mouseenter", showPreview);
              markerElement.addEventListener("mouseleave", hidePreview);
              markerElement.addEventListener("focus", showPreview);
              markerElement.addEventListener("blur", hidePreview);
              markerElement.addEventListener("pointerdown", (event) => {
                if (
                  event.pointerType === "mouse" ||
                  event.pointerType === "pen"
                ) {
                  event.preventDefault();
                  markerElement.focus({ preventScroll: true });
                }
              });
              markerElement.addEventListener("click", showDetails);
            });

            framingData.forEach((location) =>
              bounds.extend(location.coordinates),
            );
            if (!bounds.isEmpty()) {
              localMap.fitBounds(bounds, {
                padding: 64,
                maxZoom: 8.5,
                duration: 0,
              });
            }
          }
        });

        if (mode === "picker") {
          localMap.on("click", (event) => {
            const next: [number, number] = [event.lngLat.lng, event.lngLat.lat];
            markerRef.current?.setLngLat(next);
            coordinateCallbackRef.current?.(next);
          });
        }
        localMap.on("error", () => setStatus("error"));
      } catch {
        setStatus("error");
      }
    }

    void initializeMap();
    return () => {
      cancelled = true;
      popupRef.current?.remove();
      renderedMarkers.forEach((marker) => marker.remove());
      markerRoots.forEach((root) => root.unmount());
      localMap?.remove();
      mapRef.current = null;
      mapLibraryRef.current = null;
      markerRef.current = null;
    };
  }, [mode, locationData, framingData]);

  useEffect(() => {
    if (
      !coordinates ||
      !isValidLngLat(coordinates) ||
      !markerRef.current ||
      !mapRef.current ||
      mode !== "picker"
    )
      return;
    markerRef.current.setLngLat(coordinates);
  }, [coordinates, mode, status]);

  const locateUser = () => {
    if (!window.isSecureContext) {
      setLocationMessage(
        "Location access requires HTTPS. Open the secure version of this website and try again.",
      );
      return;
    }
    if (!navigator.geolocation) {
      setLocationMessage(
        "This browser does not support location access. Tap the map to choose the property location.",
      );
      return;
    }

    setLocating(true);
    setLocationMessage("Requesting your device location…");

    const handleSuccess = (position: GeolocationPosition) => {
      const next: [number, number] = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      if (!isValidLngLat(next)) {
        setLocationMessage(
          "The device returned an invalid location. Tap the map to choose the property location.",
        );
        setLocating(false);
        return;
      }

      const map = mapRef.current;
      const maplibregl = mapLibraryRef.current;
      if (map && !markerRef.current && maplibregl) {
        const markerElement = document.createElement("span");
        markerElement.className = "dmsa-map-marker";
        markerElement.setAttribute("role", "img");
        markerElement.setAttribute("aria-label", "Your current location");
        markerElement.innerHTML = '<span aria-hidden="true"></span>';
        markerRef.current = new maplibregl.Marker({ element: markerElement })
          .setLngLat(next)
          .addTo(map);
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      map?.flyTo({ center: next, zoom: 15, duration: reduceMotion ? 0 : 900 });
      markerRef.current?.setLngLat(next);
      coordinateCallbackRef.current?.(next);
      setLocationMessage(
        "Location found. Drag the pin or tap the map if you need to refine it.",
      );
      setLocating(false);
    };

    const handleFailure = (
      error: GeolocationPositionError,
      allowFallback: boolean,
    ) => {
      if (
        allowFallback &&
        (error.code === error.POSITION_UNAVAILABLE ||
          error.code === error.TIMEOUT)
      ) {
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          (fallbackError) => handleFailure(fallbackError, false),
          {
            enableHighAccuracy: false,
            timeout: 12000,
            maximumAge: 60000,
          },
        );
        return;
      }

      const message =
        error.code === error.PERMISSION_DENIED
          ? "Location permission was denied. Enable location access in your browser settings, then try again."
          : error.code === error.TIMEOUT
            ? "Your device took too long to provide a location. Move near a window or tap the map to choose it manually."
            : "Your location is currently unavailable. Check device location services or tap the map to choose it manually.";
      setLocationMessage(message);
      setLocating(false);
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      (error) => handleFailure(error, true),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 15000 },
    );
  };

  const resetView = () => {
    if (mode === "treated" && framingData.length) {
      const longitudes = framingData.map((location) => location.coordinates[0]);
      const latitudes = framingData.map((location) => location.coordinates[1]);
      mapRef.current?.fitBounds(
        [
          [Math.min(...longitudes), Math.min(...latitudes)],
          [Math.max(...longitudes), Math.max(...latitudes)],
        ],
        { padding: 64, maxZoom: 8.5, duration: 500 },
      );
      return;
    }
    mapRef.current?.easeTo({
      center: mode === "hq" ? siteConfig.hqCoordinates : philippinesCenter,
      zoom: mode === "hq" ? 13 : 5.2,
      pitch: mode === "treated" ? 44 : 0,
      bearing: mode === "treated" ? -12 : 0,
    });
  };

  return (
    <div className={`map-frame ${className}`}>
      <div
        ref={containerRef}
        className="map-canvas"
        role="region"
        aria-label={
          mode === "picker"
            ? "Property location map"
            : mode === "hq"
              ? "DMSA headquarters map"
              : "Sample treated locations map"
        }
      />
      {status === "loading" ? (
        <div className="map-status">
          <span className="spinner" />
          Loading map…
        </div>
      ) : null}
      {status === "error" ? (
        <div className="map-status map-error">
          <Crosshair aria-hidden="true" />
          Map tiles are unavailable. Coordinates and list controls still work.
        </div>
      ) : null}
      <div className="map-actions">
        {mode !== "hq" ? (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={locateUser}
            disabled={locating || status === "loading"}
            aria-describedby={locationMessage ? locationMessageId : undefined}
          >
            <LocateFixed aria-hidden="true" />
            {locating ? "Locating…" : "Use my location"}
          </Button>
        ) : null}
        <Button
          type="button"
          size="icon-sm"
          variant="secondary"
          onClick={resetView}
          aria-label="Reset map view"
          title="Reset map view"
        >
          <RotateCcw aria-hidden="true" />
        </Button>
      </div>
      {locationMessage ? (
        <p
          id={locationMessageId}
          className="map-location-message"
          role="status"
          aria-live="polite"
        >
          {locationMessage}
        </p>
      ) : null}
    </div>
  );
}
