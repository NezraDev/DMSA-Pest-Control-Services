import {
  Bug,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  Compass,
  Handshake,
  Home,
  MapPinned,
  MessageCircle,
  Rat,
  SearchCheck,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import type { IconName } from "@/lib/content-types";

export const iconMap = {
  bug: Bug,
  building: Building2,
  calendar: CalendarCheck2,
  clipboard: ClipboardCheck,
  compass: Compass,
  handshake: Handshake,
  home: Home,
  map: MapPinned,
  message: MessageCircle,
  rat: Rat,
  search: SearchCheck,
  shield: ShieldCheck,
  sprout: Sprout,
} satisfies Record<IconName, typeof Bug>;

export const pestIconMap = {
  Ants: Bug,
  Cockroaches: Bug,
  Flies: Bug,
  Rodents: Rat,
  Termites: ShieldCheck,
};
