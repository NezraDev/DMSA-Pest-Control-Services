# Windows setup and repair

This version uses **Tailwind CSS 3.4.17**, which does not depend on the Tailwind 4 Oxide native executable that caused the earlier `not a valid Win32 application` error.

## Recommended clean setup

1. Stop any running DMSA development server.
2. Delete or rename the previously extracted DMSA folder.
3. Extract the corrected `dmsa.zip` into a new folder.
4. Open the inner `dmsa` folder in Visual Studio Code.
5. Open **Terminal → New Terminal** and run:

```powershell
node -p "process.platform + ' ' + process.arch"
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Expected architecture

The first command must report either:

```text
win32 x64
```

or:

```text
win32 arm64
```

If it reports `win32 ia32`, uninstall Node.js and install the current 64-bit Node.js release before continuing.

## Verify Tailwind and MapLibre

```powershell
npm ls tailwindcss maplibre-gl
```

Expected packages:

```text
tailwindcss@3.4.17
maplibre-gl@6.7.x
```

## If an old installation was reused

Run these commands only from the DMSA folder containing `package.json`:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev
```

Do not delete the corrected `package-lock.json`. It contains the repaired dependency versions.
