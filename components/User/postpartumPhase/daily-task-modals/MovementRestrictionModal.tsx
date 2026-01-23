"use client";

import Button from "@/components/ui/Button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MovementRestrictionModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Movement Restriction</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Please check and record any redness, swelling, pain, or dryness around
          the incision.
        </p>

        {/* Backend-ready form placeholder */}
        <div className="border rounded-lg p-4 text-center text-gray-400">
          Form inputs will be added here
        </div>

        <Button className="w-full">Save Check</Button>
      </div>
    </DialogContent>
  );
}
