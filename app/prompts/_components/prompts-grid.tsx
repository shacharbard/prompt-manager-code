// app/prompts/components/prompts-grid.tsx
"use client"; // Mark as Client Component for state and interaction

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "./copy-button";
import { CreatePromptDialog } from "./create-prompt-dialog";
import { DeletePromptDialog } from "./delete-prompt-dialog";
import { EditPromptDialog } from "./edit-prompt-dialog";

interface Prompt {
  id: number;
  name: string;
  description: string;
  content: string;
}

interface PromptsGridProps {
  prompts: Prompt[];
  onCreatePrompt: (data: { name: string; description: string; content: string }) => Promise<void>;
  onEditPrompt: (id: number, data: { name: string; description: string; content: string }) => Promise<void>;
  onDeletePrompt: (id: number) => Promise<void>;
}

export function PromptsGrid({ prompts, onCreatePrompt, onEditPrompt, onDeletePrompt }: PromptsGridProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Prompts</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Prompt
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt) => (
          <Card key={prompt.id}>
            <CardHeader>
              <CardTitle>{prompt.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">{prompt.description}</p>
              <div className="mt-2 rounded-md bg-secondary p-4">
                <p className="text-sm font-mono whitespace-pre-wrap break-words">{prompt.content}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingPrompt(prompt)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingPrompt(prompt)}
                >
                  Delete
                </Button>
              </div>
              <CopyButton text={prompt.content} />
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreatePromptDialog
        open={isCreating}
        onOpenChange={setIsCreating}
        onCreatePrompt={onCreatePrompt}
      />

      {editingPrompt && (
        <EditPromptDialog
          prompt={editingPrompt}
          open={!!editingPrompt}
          onOpenChange={(open) => !open && setEditingPrompt(null)}
          onEditPrompt={onEditPrompt}
        />
      )}

      {deletingPrompt && (
        <DeletePromptDialog
          promptName={deletingPrompt.name}
          open={!!deletingPrompt}
          onOpenChange={(open) => !open && setDeletingPrompt(null)}
          onDeletePrompt={() => onDeletePrompt(deletingPrompt.id)}
        />
      )}
    </div>
  );
}
