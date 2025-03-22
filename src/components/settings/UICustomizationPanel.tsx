import React, { useState } from "react";
import { Grid, Layout, Palette, Type } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface UICustomizationPanelProps {
  onSave?: (settings: UISettings) => void;
  initialSettings?: UISettings;
}

interface UISettings {
  layout: {
    gridSize: string;
    showImages: boolean;
    showPrices: boolean;
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    fontSize: string;
    buttonStyle: string;
  };
  categories: {
    visible: boolean;
    position: string;
  };
}

const defaultSettings: UISettings = {
  layout: {
    gridSize: "medium",
    showImages: true,
    showPrices: true,
  },
  appearance: {
    primaryColor: "#4f46e5",
    secondaryColor: "#f97316",
    fontSize: "medium",
    buttonStyle: "rounded",
  },
  categories: {
    visible: true,
    position: "top",
  },
};

const UICustomizationPanel = ({
  onSave = () => {},
  initialSettings = defaultSettings,
}: UICustomizationPanelProps) => {
  const [settings, setSettings] = useState<UISettings>(initialSettings);
  const [activeTab, setActiveTab] = useState("layout");

  const handleLayoutChange = (
    key: keyof typeof settings.layout,
    value: any,
  ) => {
    setSettings({
      ...settings,
      layout: {
        ...settings.layout,
        [key]: value,
      },
    });
  };

  const handleAppearanceChange = (
    key: keyof typeof settings.appearance,
    value: any,
  ) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    });
  };

  const handleCategoriesChange = (
    key: keyof typeof settings.categories,
    value: any,
  ) => {
    setSettings({
      ...settings,
      categories: {
        ...settings.categories,
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">Kustomisasi Tampilan Kasir</CardTitle>
        <CardDescription>
          Sesuaikan tampilan aplikasi kasir sesuai dengan kebutuhan bisnis Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="layout"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              <span>Tata Letak</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Tampilan</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span>Kategori</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Ukuran Grid Produk
                  </h3>
                  <Select
                    value={settings.layout.gridSize}
                    onValueChange={(value) =>
                      handleLayoutChange("gridSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ukuran grid" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Kecil (6x6)</SelectItem>
                      <SelectItem value="medium">Sedang (4x4)</SelectItem>
                      <SelectItem value="large">Besar (3x3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">
                      Tampilkan Gambar Produk
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Menampilkan gambar pada tombol produk
                    </p>
                  </div>
                  <Switch
                    checked={settings.layout.showImages}
                    onCheckedChange={(checked) =>
                      handleLayoutChange("showImages", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">
                      Tampilkan Harga Produk
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Menampilkan harga pada tombol produk
                    </p>
                  </div>
                  <Switch
                    checked={settings.layout.showPrices}
                    onCheckedChange={(checked) =>
                      handleLayoutChange("showPrices", checked)
                    }
                  />
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Pratinjau Tata Letak
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white border rounded-md p-2 h-16 flex flex-col items-center justify-center"
                        style={{
                          borderRadius:
                            settings.appearance.buttonStyle === "rounded"
                              ? "0.375rem"
                              : settings.appearance.buttonStyle === "pill"
                                ? "9999px"
                                : "0",
                          backgroundColor:
                            i % 3 === 0
                              ? settings.appearance.primaryColor
                              : "white",
                          color: i % 3 === 0 ? "white" : "black",
                        }}
                      >
                        {settings.layout.showImages && (
                          <div className="w-6 h-6 bg-gray-200 rounded-full mb-1"></div>
                        )}
                        <span className="text-xs truncate">Produk {i + 1}</span>
                        {settings.layout.showPrices && (
                          <span className="text-xs">Rp 25.000</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Warna Utama</h3>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("primaryColor", e.target.value)
                      }
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      type="text"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("primaryColor", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Warna Sekunder</h3>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("secondaryColor", e.target.value)
                      }
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      type="text"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("secondaryColor", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Ukuran Font</h3>
                  <Select
                    value={settings.appearance.fontSize}
                    onValueChange={(value) =>
                      handleAppearanceChange("fontSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ukuran font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Kecil</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="large">Besar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Gaya Tombol</h3>
                  <Select
                    value={settings.appearance.buttonStyle}
                    onValueChange={(value) =>
                      handleAppearanceChange("buttonStyle", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih gaya tombol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Kotak</SelectItem>
                      <SelectItem value="rounded">Membulat</SelectItem>
                      <SelectItem value="pill">Pil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pratinjau Tampilan
                </p>

                <div className="w-full max-w-xs space-y-2">
                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: settings.appearance.primaryColor,
                      borderRadius:
                        settings.appearance.buttonStyle === "rounded"
                          ? "0.375rem"
                          : settings.appearance.buttonStyle === "pill"
                            ? "9999px"
                            : "0",
                    }}
                  >
                    Tombol Utama
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    style={{
                      borderColor: settings.appearance.secondaryColor,
                      color: settings.appearance.secondaryColor,
                      borderRadius:
                        settings.appearance.buttonStyle === "rounded"
                          ? "0.375rem"
                          : settings.appearance.buttonStyle === "pill"
                            ? "9999px"
                            : "0",
                    }}
                  >
                    Tombol Sekunder
                  </Button>

                  <div
                    className="bg-white p-4 rounded-md border"
                    style={{
                      borderRadius:
                        settings.appearance.buttonStyle === "rounded"
                          ? "0.375rem"
                          : settings.appearance.buttonStyle === "pill"
                            ? "1rem"
                            : "0",
                    }}
                  >
                    <h3
                      className="font-medium"
                      style={{
                        fontSize:
                          settings.appearance.fontSize === "small"
                            ? "0.875rem"
                            : settings.appearance.fontSize === "medium"
                              ? "1rem"
                              : "1.25rem",
                        color: settings.appearance.primaryColor,
                      }}
                    >
                      Judul Kartu
                    </h3>
                    <p
                      className="mt-1"
                      style={{
                        fontSize:
                          settings.appearance.fontSize === "small"
                            ? "0.75rem"
                            : settings.appearance.fontSize === "medium"
                              ? "0.875rem"
                              : "1rem",
                      }}
                    >
                      Ini adalah contoh teks dalam kartu untuk menunjukkan
                      tampilan font dan warna.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Tampilkan Kategori</h3>
                    <p className="text-sm text-muted-foreground">
                      Menampilkan tab kategori produk
                    </p>
                  </div>
                  <Switch
                    checked={settings.categories.visible}
                    onCheckedChange={(checked) =>
                      handleCategoriesChange("visible", checked)
                    }
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Posisi Kategori</h3>
                  <Select
                    value={settings.categories.position}
                    onValueChange={(value) =>
                      handleCategoriesChange("position", value)
                    }
                    disabled={!settings.categories.visible}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih posisi kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Atas</SelectItem>
                      <SelectItem value="left">Kiri</SelectItem>
                      <SelectItem value="right">Kanan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Pratinjau Kategori
                  </p>

                  {settings.categories.visible && (
                    <div
                      className={`flex ${
                        settings.categories.position === "left"
                          ? "flex-row"
                          : settings.categories.position === "right"
                            ? "flex-row-reverse"
                            : "flex-col"
                      }`}
                    >
                      <div
                        className={`${settings.categories.position === "top" ? "w-full mb-4" : "w-1/3"}`}
                      >
                        <div
                          className={`bg-white border rounded-md p-2 ${settings.categories.position === "top" ? "flex space-x-2 justify-center" : "space-y-2"}`}
                        >
                          {["Makanan", "Minuman", "Snack"].map((cat, i) => (
                            <div
                              key={i}
                              className={`px-3 py-1.5 text-xs text-center ${i === 0 ? "bg-primary text-white" : "bg-gray-100"}`}
                              style={{
                                backgroundColor:
                                  i === 0
                                    ? settings.appearance.primaryColor
                                    : "",
                                borderRadius:
                                  settings.appearance.buttonStyle === "rounded"
                                    ? "0.375rem"
                                    : settings.appearance.buttonStyle === "pill"
                                      ? "9999px"
                                      : "0",
                              }}
                            >
                              {cat}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`${settings.categories.position === "top" ? "w-full" : "w-2/3"}`}
                      >
                        <div className="grid grid-cols-2 gap-2 bg-white border rounded-md p-2">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className="bg-gray-50 border rounded-md p-2 h-12 flex items-center justify-center"
                              style={{
                                borderRadius:
                                  settings.appearance.buttonStyle === "rounded"
                                    ? "0.375rem"
                                    : settings.appearance.buttonStyle === "pill"
                                      ? "9999px"
                                      : "0",
                              }}
                            >
                              <span className="text-xs">Produk {i + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {!settings.categories.visible && (
                    <div className="grid grid-cols-2 gap-2 bg-white border rounded-md p-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border rounded-md p-2 h-12 flex items-center justify-center"
                          style={{
                            borderRadius:
                              settings.appearance.buttonStyle === "rounded"
                                ? "0.375rem"
                                : settings.appearance.buttonStyle === "pill"
                                  ? "9999px"
                                  : "0",
                          }}
                        >
                          <span className="text-xs">Produk {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 space-x-2">
          <Button
            variant="outline"
            onClick={() => setSettings(defaultSettings)}
          >
            Reset ke Default
          </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: settings.appearance.primaryColor }}
          >
            Simpan Perubahan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UICustomizationPanel;
