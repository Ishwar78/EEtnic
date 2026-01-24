import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface SizeOption {
  id: string;
  name: string;
}

interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

interface SubcategoryOption {
  id: string;
  name: string;
}

const AdminFilterManagement = () => {
  // Sizes State
  const [sizes, setSizes] = useState<SizeOption[]>([
    { id: "1", name: "S" },
    { id: "2", name: "M" },
    { id: "3", name: "L" },
    { id: "4", name: "XL" },
    { id: "5", name: "XXL" },
    { id: "6", name: "XXXL" },
    { id: "7", name: "Free Size" },
  ]);

  const [colors, setColors] = useState<ColorOption[]>([
    { id: "1", name: "Burgundy", hex: "#722F37" },
    { id: "2", name: "Blue", hex: "#1E3A8A" },
    { id: "3", name: "Pink", hex: "#EC4899" },
    { id: "4", name: "Green", hex: "#059669" },
    { id: "5", name: "Maroon", hex: "#800000" },
    { id: "6", name: "Ivory", hex: "#FFFFF0" },
    { id: "7", name: "Teal", hex: "#0D9488" },
    { id: "8", name: "Orange", hex: "#EA580C" },
    { id: "9", name: "Red", hex: "#DC2626" },
    { id: "10", name: "White", hex: "#FFFFFF" },
    { id: "11", name: "Black", hex: "#000000" },
    { id: "12", name: "Gold", hex: "#FBBF24" },
  ]);

  const [ethnicSubcategories, setEthnicSubcategories] = useState<SubcategoryOption[]>([
    { id: "1", name: "Kurta Sets" },
    { id: "2", name: "Anarkali Suits" },
    { id: "3", name: "Lehengas" },
    { id: "4", name: "Party Wear" },
    { id: "5", name: "Festive Collection" },
  ]);

  const [westernSubcategories, setWesternSubcategories] = useState<SubcategoryOption[]>([
    { id: "1", name: "Tops & Tees" },
    { id: "2", name: "Dresses" },
    { id: "3", name: "Co-ord Sets" },
    { id: "4", name: "Casual Wear" },
  ]);

  // Dialog States
  const [sizeDialogOpen, setSizeDialogOpen] = useState(false);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [ethnicDialogOpen, setEthnicDialogOpen] = useState(false);
  const [westernDialogOpen, setWesternDialogOpen] = useState(false);

  const [editingSize, setEditingSize] = useState<SizeOption | null>(null);
  const [editingColor, setEditingColor] = useState<ColorOption | null>(null);
  const [editingEthnic, setEditingEthnic] = useState<SubcategoryOption | null>(null);
  const [editingWestern, setEditingWestern] = useState<SubcategoryOption | null>(null);

  const [newSizeName, setNewSizeName] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#FFFFFF");
  const [newEthnicName, setNewEthnicName] = useState("");
  const [newWesternName, setNewWesternName] = useState("");

  // Size Functions
  const handleAddSize = () => {
    if (!newSizeName.trim()) {
      toast.error("Size name is required");
      return;
    }

    if (sizes.some((s) => s.name.toLowerCase() === newSizeName.toLowerCase())) {
      toast.error("This size already exists");
      return;
    }

    const newSize: SizeOption = {
      id: Date.now().toString(),
      name: newSizeName,
    };

    setSizes([...sizes, newSize]);
    setNewSizeName("");
    setSizeDialogOpen(false);
    toast.success("Size added successfully");
  };

  const handleUpdateSize = () => {
    if (!editingSize || !newSizeName.trim()) {
      toast.error("Size name is required");
      return;
    }

    setSizes(
      sizes.map((s) =>
        s.id === editingSize.id ? { ...s, name: newSizeName } : s
      )
    );
    setEditingSize(null);
    setNewSizeName("");
    setSizeDialogOpen(false);
    toast.success("Size updated successfully");
  };

  const handleDeleteSize = (id: string) => {
    if (sizes.length <= 1) {
      toast.error("At least one size is required");
      return;
    }
    setSizes(sizes.filter((s) => s.id !== id));
    toast.success("Size deleted successfully");
  };

  // Color Functions
  const handleAddColor = () => {
    if (!newColorName.trim()) {
      toast.error("Color name is required");
      return;
    }

    if (colors.some((c) => c.name.toLowerCase() === newColorName.toLowerCase())) {
      toast.error("This color already exists");
      return;
    }

    const newColor: ColorOption = {
      id: Date.now().toString(),
      name: newColorName,
      hex: newColorHex,
    };

    setColors([...colors, newColor]);
    setNewColorName("");
    setNewColorHex("#FFFFFF");
    setColorDialogOpen(false);
    toast.success("Color added successfully");
  };

  const handleUpdateColor = () => {
    if (!editingColor || !newColorName.trim()) {
      toast.error("Color name is required");
      return;
    }

    setColors(
      colors.map((c) =>
        c.id === editingColor.id
          ? { ...c, name: newColorName, hex: newColorHex }
          : c
      )
    );
    setEditingColor(null);
    setNewColorName("");
    setNewColorHex("#FFFFFF");
    setColorDialogOpen(false);
    toast.success("Color updated successfully");
  };

  const handleDeleteColor = (id: string) => {
    if (colors.length <= 1) {
      toast.error("At least one color is required");
      return;
    }
    setColors(colors.filter((c) => c.id !== id));
    toast.success("Color deleted successfully");
  };

  // Ethnic Subcategory Functions
  const handleAddEthnic = () => {
    if (!newEthnicName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (
      ethnicSubcategories.some(
        (s) => s.name.toLowerCase() === newEthnicName.toLowerCase()
      )
    ) {
      toast.error("This category already exists");
      return;
    }

    const newSubcategory: SubcategoryOption = {
      id: Date.now().toString(),
      name: newEthnicName,
    };

    setEthnicSubcategories([...ethnicSubcategories, newSubcategory]);
    setNewEthnicName("");
    setEthnicDialogOpen(false);
    toast.success("Ethnic subcategory added successfully");
  };

  const handleUpdateEthnic = () => {
    if (!editingEthnic || !newEthnicName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setEthnicSubcategories(
      ethnicSubcategories.map((s) =>
        s.id === editingEthnic.id ? { ...s, name: newEthnicName } : s
      )
    );
    setEditingEthnic(null);
    setNewEthnicName("");
    setEthnicDialogOpen(false);
    toast.success("Ethnic subcategory updated successfully");
  };

  const handleDeleteEthnic = (id: string) => {
    if (ethnicSubcategories.length <= 1) {
      toast.error("At least one subcategory is required");
      return;
    }
    setEthnicSubcategories(ethnicSubcategories.filter((s) => s.id !== id));
    toast.success("Ethnic subcategory deleted successfully");
  };

  // Western Subcategory Functions
  const handleAddWestern = () => {
    if (!newWesternName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (
      westernSubcategories.some(
        (s) => s.name.toLowerCase() === newWesternName.toLowerCase()
      )
    ) {
      toast.error("This category already exists");
      return;
    }

    const newSubcategory: SubcategoryOption = {
      id: Date.now().toString(),
      name: newWesternName,
    };

    setWesternSubcategories([...westernSubcategories, newSubcategory]);
    setNewWesternName("");
    setWesternDialogOpen(false);
    toast.success("Western subcategory added successfully");
  };

  const handleUpdateWestern = () => {
    if (!editingWestern || !newWesternName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setWesternSubcategories(
      westernSubcategories.map((s) =>
        s.id === editingWestern.id ? { ...s, name: newWesternName } : s
      )
    );
    setEditingWestern(null);
    setNewWesternName("");
    setWesternDialogOpen(false);
    toast.success("Western subcategory updated successfully");
  };

  const handleDeleteWestern = (id: string) => {
    if (westernSubcategories.length <= 1) {
      toast.error("At least one subcategory is required");
      return;
    }
    setWesternSubcategories(westernSubcategories.filter((s) => s.id !== id));
    toast.success("Western subcategory deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Filter Management</h2>
        <p className="text-muted-foreground mt-1">
          Manage sizes, colors, and subcategories for your store
        </p>
      </div>

      <Tabs defaultValue="sizes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="ethnic">Ethnic Wear</TabsTrigger>
          <TabsTrigger value="western">Western Wear</TabsTrigger>
        </TabsList>

        {/* SIZES TAB */}
        <TabsContent value="sizes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Size Options</CardTitle>
                  <CardDescription>Add or edit available size options</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setEditingSize(null);
                    setNewSizeName("");
                    setSizeDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Size
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <div
                    key={size.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-card"
                  >
                    <span className="font-medium">{size.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingSize(size);
                          setNewSizeName(size.name);
                          setSizeDialogOpen(true);
                        }}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSize(size.id)}
                        className="p-1 hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COLORS TAB */}
        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Color Options</CardTitle>
                  <CardDescription>Add or edit available colors</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setEditingColor(null);
                    setNewColorName("");
                    setNewColorHex("#FFFFFF");
                    setColorDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Color
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.hex}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingColor(color);
                          setNewColorName(color.name);
                          setNewColorHex(color.hex);
                          setColorDialogOpen(true);
                        }}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteColor(color.id)}
                        className="p-1 hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ETHNIC SUBCATEGORIES TAB */}
        <TabsContent value="ethnic" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ethnic Wear Subcategories</CardTitle>
                  <CardDescription>Manage ethnic wear subcategories</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setEditingEthnic(null);
                    setNewEthnicName("");
                    setEthnicDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ethnicSubcategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-card"
                  >
                    <span className="font-medium">{category.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingEthnic(category);
                          setNewEthnicName(category.name);
                          setEthnicDialogOpen(true);
                        }}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEthnic(category.id)}
                        className="p-1 hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WESTERN SUBCATEGORIES TAB */}
        <TabsContent value="western" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Western Wear Subcategories</CardTitle>
                  <CardDescription>Manage western wear subcategories</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setEditingWestern(null);
                    setNewWesternName("");
                    setWesternDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {westernSubcategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-card"
                  >
                    <span className="font-medium">{category.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingWestern(category);
                          setNewWesternName(category.name);
                          setWesternDialogOpen(true);
                        }}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteWestern(category.id)}
                        className="p-1 hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* SIZE DIALOG */}
      <Dialog open={sizeDialogOpen} onOpenChange={setSizeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSize ? "Edit Size" : "Add New Size"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="size-name">Size Name</Label>
              <Input
                id="size-name"
                value={newSizeName}
                onChange={(e) => setNewSizeName(e.target.value)}
                placeholder="e.g., S, M, L, XL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSizeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingSize ? handleUpdateSize : handleAddSize}
            >
              {editingSize ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* COLOR DIALOG */}
      <Dialog open={colorDialogOpen} onOpenChange={setColorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingColor ? "Edit Color" : "Add New Color"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="color-name">Color Name</Label>
              <Input
                id="color-name"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="e.g., Red, Blue, Green"
              />
            </div>
            <div>
              <Label htmlFor="color-hex">Color Code</Label>
              <div className="flex gap-2">
                <Input
                  id="color-hex"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  placeholder="#FFFFFF"
                />
                <div
                  className="w-10 h-10 rounded border cursor-pointer"
                  style={{ backgroundColor: newColorHex }}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "color";
                    input.value = newColorHex;
                    input.onchange = (e: any) => setNewColorHex(e.target.value);
                    input.click();
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setColorDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingColor ? handleUpdateColor : handleAddColor}
            >
              {editingColor ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ETHNIC DIALOG */}
      <Dialog open={ethnicDialogOpen} onOpenChange={setEthnicDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEthnic ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ethnic-name">Category Name</Label>
              <Input
                id="ethnic-name"
                value={newEthnicName}
                onChange={(e) => setNewEthnicName(e.target.value)}
                placeholder="e.g., Kurta Sets, Lehengas"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEthnicDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingEthnic ? handleUpdateEthnic : handleAddEthnic}
            >
              {editingEthnic ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* WESTERN DIALOG */}
      <Dialog open={westernDialogOpen} onOpenChange={setWesternDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingWestern ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="western-name">Category Name</Label>
              <Input
                id="western-name"
                value={newWesternName}
                onChange={(e) => setNewWesternName(e.target.value)}
                placeholder="e.g., Dresses, Tops & Tees"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWesternDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingWestern ? handleUpdateWestern : handleAddWestern}
            >
              {editingWestern ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFilterManagement;
