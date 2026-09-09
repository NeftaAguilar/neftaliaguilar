"use client";

import { useState, type CSSProperties } from "react";
import {
  Button,
  Dialog,
  DropdownMenu,
  Select,
  Switch,
  Tabs,
  TextField,
  Textarea,
  Toast,
  Tooltip,
  TooltipProvider,
} from "@neftaliaguilar/ui";
import styles from "./mdx-playground.module.css";

type AccentPreset = {
  name: string;
  swatch: string;
  vars: CSSProperties;
};

const accentPresets: AccentPreset[] = [
  {
    name: "Indigo (default)",
    swatch: "#3e63dd",
    vars: {
      "--nef-accent-100": "#f7f9ff",
      "--nef-accent-400": "#c1d0ff",
      "--nef-accent-600": "#3e63dd",
      "--nef-accent-900": "#1f2d5c",
    } as CSSProperties,
  },
  {
    name: "Violet",
    swatch: "#7c3aed",
    vars: {
      "--nef-accent-100": "#f5f0ff",
      "--nef-accent-400": "#d3bfff",
      "--nef-accent-600": "#7c3aed",
      "--nef-accent-900": "#4c1d95",
    } as CSSProperties,
  },
  {
    name: "Teal",
    swatch: "#0d9488",
    vars: {
      "--nef-accent-100": "#effcfa",
      "--nef-accent-400": "#99f0e6",
      "--nef-accent-600": "#0d9488",
      "--nef-accent-900": "#0f4a44",
    } as CSSProperties,
  },
];

export function MdxPlayground() {
  const [accentIndex, setAccentIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <TooltipProvider>
        <div
          className={styles.wrapper}
          data-theme={theme}
          style={accentPresets[accentIndex].vars}
        >
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Accent</span>
              {accentPresets.map((preset, index) => (
                <button
                  key={preset.name}
                  type="button"
                  aria-label={`Use ${preset.name} accent`}
                  aria-pressed={accentIndex === index}
                  className={`${styles.swatch} ${
                    accentIndex === index ? styles.swatchActive : ""
                  }`}
                  style={{ backgroundColor: preset.swatch }}
                  onClick={() => setAccentIndex(index)}
                />
              ))}
            </div>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Theme</span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
                label={theme === "dark" ? "Dark" : "Light"}
              />
            </div>
          </div>

          <div className={styles.body}>
            <Tabs defaultValue="actions">
              <Tabs.List aria-label="Component category">
                <Tabs.Trigger value="actions">Actions</Tabs.Trigger>
                <Tabs.Trigger value="forms">Forms</Tabs.Trigger>
                <Tabs.Trigger value="overlays">Overlays</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="actions">
                <p className={styles.hint}>
                  Every variant reads <code>--nef-accent</code> — the swatches
                  above rewrite the token, not the component.
                </p>
                <div className={styles.row}>
                  <Button variant="solid">Solid</Button>
                  <Button variant="soft">Soft</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div className={styles.row}>
                  <Button
                    variant="solid"
                    loading={buttonLoading}
                    onClick={() => {
                      setButtonLoading(true);
                      setTimeout(() => setButtonLoading(false), 1500);
                    }}
                  >
                    {buttonLoading ? "Loading…" : "Trigger loading state"}
                  </Button>
                  <Button variant="outline" onClick={() => setToastOpen(true)}>
                    Show toast
                  </Button>
                </div>
              </Tabs.Content>

              <Tabs.Content value="forms">
                <div className={styles.formGrid}>
                  <TextField label="Channel name" placeholder="general" />
                  <Select label="Visibility" placeholder="Choose one">
                    <Select.Item value="public">Public</Select.Item>
                    <Select.Item value="private">Private</Select.Item>
                  </Select>
                  <Textarea
                    label="Description"
                    placeholder="What's this channel for?"
                  />
                  <Switch label="Notify members on join" />
                </div>
              </Tabs.Content>

              <Tabs.Content value="overlays">
                <p className={styles.hint}>
                  Radix portals this content to <code>document.body</code>, so
                  it renders the site&apos;s own theme — not the swatches above.
                </p>
                <div className={styles.row}>
                  <Dialog>
                    <Dialog.Trigger asChild>
                      <Button variant="outline">Open dialog</Button>
                    </Dialog.Trigger>
                    <Dialog.Content
                      title="Delete channel"
                      description="This can't be undone."
                      footer={
                        <>
                          <Dialog.Close asChild>
                            <Button variant="ghost">Cancel</Button>
                          </Dialog.Close>
                          <Dialog.Close asChild>
                            <Button variant="danger">Delete</Button>
                          </Dialog.Close>
                        </>
                      }
                    >
                      Deleting removes it for every member immediately.
                    </Dialog.Content>
                  </Dialog>

                  <Tooltip content="Describes, never names">
                    <Button variant="ghost">Hover me</Button>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="outline">Open menu</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="start">
                      <DropdownMenu.Item shortcut="⌘E">Edit</DropdownMenu.Item>
                      <DropdownMenu.Item shortcut="⌘D">
                        Duplicate
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                </div>
              </Tabs.Content>
            </Tabs>
          </div>
        </div>
      </TooltipProvider>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title="Channel created"
        description="general is ready to use."
        tone="success"
      />
      <Toast.Viewport />
    </Toast.Provider>
  );
}
