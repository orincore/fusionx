"use client";

import { Trash2, User } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface MemberFormProps {
  member: Member;
  index: number;
  onUpdate: (id: string, field: keyof Member, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function MemberForm({ member, index, onUpdate, onRemove, canRemove }: MemberFormProps) {
  const isPrimary = index === 0;
  
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-medium text-white">
            {isPrimary ? "Primary Contact" : `Member ${index + 1}`}
          </h3>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(member.id)}
            className="rounded-full p-1 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            aria-label={`Remove member ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`name-${member.id}`}
            className="block text-sm font-medium text-zinc-100 mb-2"
          >
            Full Name *
          </label>
          <input
            id={`name-${member.id}`}
            type="text"
            value={member.name}
            onChange={(e) => onUpdate(member.id, 'name', e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Only show email and phone for primary contact */}
        {isPrimary && (
          <>
            <div>
              <label
                htmlFor={`email-${member.id}`}
                className="block text-sm font-medium text-zinc-100 mb-2"
              >
                Email Address *
              </label>
              <input
                id={`email-${member.id}`}
                type="email"
                value={member.email}
                onChange={(e) => onUpdate(member.id, 'email', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`phone-${member.id}`}
                className="block text-sm font-medium text-zinc-100 mb-2"
              >
                Phone Number *
              </label>
              <input
                id={`phone-${member.id}`}
                type="tel"
                value={member.phone}
                onChange={(e) => onUpdate(member.id, 'phone', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
                placeholder="Enter phone number"
                required
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
