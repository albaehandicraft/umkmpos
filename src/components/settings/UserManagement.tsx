import React, { useState } from "react";
import { PlusCircle, Edit, Trash2, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

interface UserProps {
  users?: User[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const UserManagement = ({ users = [] }: UserProps) => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(true);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Default mock data if no users are provided
  const defaultUsers: User[] = [
    {
      id: "1",
      name: "Budi Santoso",
      email: "budi@warungku.id",
      role: "Admin",
      isActive: true,
    },
    {
      id: "2",
      name: "Siti Rahayu",
      email: "siti@warungku.id",
      role: "Kasir",
      isActive: true,
    },
    {
      id: "3",
      name: "Agus Wijaya",
      email: "agus@warungku.id",
      role: "Kasir",
      isActive: false,
    },
  ];

  const displayUsers = users.length > 0 ? users : defaultUsers;

  const filteredUsers = displayUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserOpen(true);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Pengguna</h2>
          <p className="text-gray-600">
            Tambah, edit, atau hapus akun pengguna aplikasi kasir
          </p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle size={18} />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Isi informasi untuk membuat akun pengguna baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nama
                </label>
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="Nama lengkap"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input
                  id="email"
                  className="col-span-3"
                  placeholder="email@toko.id"
                  type="email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right">
                  Password
                </label>
                <Input
                  id="password"
                  className="col-span-3"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">
                  Peran
                </label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="kasir">Kasir</SelectItem>
                    <SelectItem value="inventaris">Inventaris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right">
                  Status Aktif
                </label>
                <div className="flex items-center space-x-2">
                  <Switch id="status" defaultChecked />
                  <label htmlFor="status" className="text-sm font-medium">
                    Aktif
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Cari pengguna..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {user.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>
              Ubah informasi pengguna {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right">
                Nama
              </label>
              <Input
                id="edit-name"
                className="col-span-3"
                defaultValue={selectedUser?.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-email" className="text-right">
                Email
              </label>
              <Input
                id="edit-email"
                className="col-span-3"
                defaultValue={selectedUser?.email}
                type="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-role" className="text-right">
                Peran
              </label>
              <Select defaultValue={selectedUser?.role.toLowerCase()}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="kasir">Kasir</SelectItem>
                  <SelectItem value="inventaris">Inventaris</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-status" className="text-right">
                Status Aktif
              </label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-status"
                  defaultChecked={selectedUser?.isActive}
                />
                <label htmlFor="edit-status" className="text-sm font-medium">
                  {selectedUser?.isActive ? "Aktif" : "Nonaktif"}
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Pengguna</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengguna {selectedUser?.name}?
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteUserOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive">Hapus Pengguna</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
