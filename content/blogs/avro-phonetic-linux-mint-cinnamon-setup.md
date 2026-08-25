---
title: "Fixing Avro Phonetic Bangla Typing on Linux Mint Cinnamon: A Complete IBus Setup Guide"
slug: "avro-phonetic-linux-mint-cinnamon-setup"
excerpt: "A step-by-step fix for the Windows+Space not working issue with ibus-avro on Linux Mint Cinnamon, covering IBus integration, gsettings config, and GUI alternatives."
author: "Nahid Karim Ankur"
role: "Software Engineer @ Celloscope Ltd."
date: "2026-08-25"
readTime: "4 min read"
category: "Linux & Tooling"
tags: ["Linux Mint", "Cinnamon", "IBus", "Avro Phonetic", "Bangla Typing"]
coverIcon: "Keyboard"
gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent"
---

# Avro Phonetic Setup Guide for Linux Mint (Cinnamon)

Complete guide explaining why the issue happens and how to set up Avro Phonetic (Bangla input) on any Linux Mint (Cinnamon) machine in just a few minutes.

---

## Why the Issue Happens in Linux Mint Cinnamon

1. **Missing from Cinnamon's Source List:**
   When you install `ibus-avro`, Cinnamon's input source manager still only knows about English (US). Because there is only 1 layout in Cinnamon's list, pressing `Windows + Space` does nothing.

2. **IBus Integration:**
   Cinnamon has native IBus support, but `ibus-avro` must be explicitly added to both Cinnamon's input sources and IBus preload engines.

---

## Complete Setup Guide (Copy & Paste Commands)

On your friend's Linux Mint Cinnamon PC, open a terminal (`Ctrl + Alt + T`) and run these steps:

### Step 1: Install Avro & Dependencies

```bash
sudo apt update
sudo apt install ibus-avro ibus ibus-gtk ibus-gtk3 ibus-gtk4 gjs -y
```

### Step 2: Set IBus as the Default Input Method

```bash
im-config -n ibus
```

### Step 3: Register Avro in Cinnamon's Layout Sources

Add both US English (`xkb`, `us`) and Avro (`ibus`, `ibus-avro`) to Cinnamon's source list:

```bash
gsettings set org.cinnamon.desktop.input-sources sources "[('xkb', 'us'), ('ibus', 'ibus-avro')]"
gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us'), ('ibus', 'ibus-avro')]"
```

### Step 4: Preload Avro in IBus Engine List

```bash
gsettings set org.freedesktop.ibus.general preload-engines "['xkb:us::eng', 'ibus-avro']"
```

### Step 5: Configure the Switch Shortcuts (Win + Space & Ctrl + Space)

```bash
# Cinnamon shortcut
gsettings set org.cinnamon.desktop.keybindings.wm switch-input-source "['<Super>space', '<Control>space', 'XF86Keyboard']"
gsettings set org.cinnamon.desktop.keybindings.wm switch-input-source-backward "['<Shift><Super>space', '<Shift><Control>space', '<Shift>XF86Keyboard']"

# IBus hotkeys
gsettings set org.freedesktop.ibus.general.hotkey triggers "['<Super>space', '<Control>space']"
gsettings set org.freedesktop.ibus.general.hotkey next-engine "['<Super>space', '<Control>space', '<Alt>Shift_L']"
```

### Step 6: Restart IBus (or Log Out & Log Back In)

```bash
ibus restart
```

---

## Alternative: How to Do It via the GUI (Settings Menus)

If you prefer doing it with the mouse:

1. **Set Input Method:**
   Open Menu → Languages → Input method → select **IBus**.

2. **Add Layout:**
   Open Menu → Keyboard → go to the **Layouts** tab.
   Click the **+ (Add)** button at the bottom.
   Search for **Bangla (Avro Phonetic)** and click **Add**.

3. **Verify Shortcuts:**
   In Keyboard settings, go to the **Shortcuts** tab → **Windows** → **Switching**.
   Ensure "Switch to next input source" is set to `Super + Space`.

---

## Quick Troubleshooting Tips

- **CapsLock:** Avro ignores typing if CapsLock is ON. Keep CapsLock OFF when typing Bangla.
- **First-time Login:** If Chrome or another app doesn't recognize the switch right after installation, simply Log Out and Log In once so the environment variables take effect across all apps.