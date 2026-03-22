"use client";

import { MOCK_USERS } from "@/modules/admin/mock/users";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function UsersTable() {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-body">
          <thead>
            <tr className="text-xs uppercase text-on-surface-variant">
              <th className="pb-3 pr-4">Email</th>
              <th className="pb-3 pr-4">Role</th>
              <th className="pb-3 pr-4">Queries</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="border-t border-outline-variant/10 text-on-surface">
                <td className="py-3 pr-4">{u.email}</td>
                <td className="py-3 pr-4">{u.role}</td>
                <td className="py-3 pr-4">{u.queries}</td>
                <td className="py-3 pr-4">{u.status}</td>
                <td className="py-3">
                  <Button variant="ghost" className="!p-2 text-xs" type="button">
                    Limit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
