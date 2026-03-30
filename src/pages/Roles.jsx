import { Shield, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const rolesData = [
  { id: 1, name: 'Super Admin', description: 'Full system access with all permissions', users: 2, color: 'destructive' },
  { id: 2, name: 'Admin', description: 'Manage users, courses, and settings', users: 5, color: 'default' },
  { id: 3, name: 'Faculty', description: 'Create and manage courses and grades', users: 86, color: 'secondary' },
  { id: 4, name: 'Student', description: 'Access enrolled courses and materials', users: 1248, color: 'outline' },
  { id: 5, name: 'Moderator', description: 'Moderate discussions and content', users: 12, color: 'secondary' },
];

const Roles = () => {
  const [search, setSearch] = useState('');

  const filtered = rolesData.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-main">Roles Management</h1>
          <p className="text-sm text-muted-custom mt-1">Define and manage user roles and permissions.</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Add Role
        </Button>
      </div>

      <Card className="border-border-default bg-surface-card shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-main flex items-center gap-2">
              <Shield size={20} /> All Roles
            </CardTitle>
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom" />
              <Input
                placeholder="Search roles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-surface-card border-border-default"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border-default">
                <TableHead className="text-muted-custom">#</TableHead>
                <TableHead className="text-muted-custom">Role Name</TableHead>
                <TableHead className="text-muted-custom">Description</TableHead>
                <TableHead className="text-muted-custom text-center">Users</TableHead>
                <TableHead className="text-muted-custom text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((role, i) => (
                <TableRow key={role.id} className="border-border-default hover:bg-white/5 transition-colors">
                  <TableCell className="text-muted-custom font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Badge variant={role.color} className="text-xs font-semibold px-3 py-1">
                      {role.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-custom">{role.description}</TableCell>
                  <TableCell className="text-center font-semibold text-main">{role.users}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-custom hover:text-main">
                        <Edit2 size={15} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-custom hover:text-red-500">
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-custom">
                    No roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
