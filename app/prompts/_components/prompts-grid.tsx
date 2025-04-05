// app/prompts/components/prompts-grid.tsx
"use client"; // Mark as Client Component for state and interaction

import { createPrompt, deletePrompt, updatePrompt } from "@/actions/prompts-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Import Shadcn Card
import { motion } from "framer-motion";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "./copy-button";
import { CreatePromptDialog } from "./create-prompt-dialog";
import { DeletePromptDialog } from "./delete-prompt-dialog";
import { EditPromptDialog } from "./edit-prompt-dialog";

// Define the expected structure for a prompt object
interface Prompt {
  id: number;
  name: string;
  description: string;
  content: string;
}

// Define the props the component expects
interface PromptsGridProps {
  initialPrompts: Prompt[]; // Will receive prompts from the parent page later
}

export const PromptsGrid = ({ initialPrompts }: PromptsGridProps) => {
  // Initialize state with the real data passed from server component
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCreatePrompt = async (data: { name: string; description: string; content: string }) => {
    const newPrompt = await createPrompt(data);
    setPrompts((prev) => [...prev, newPrompt]);
  };

  const handleEditPrompt = async (id: number, data: { name: string; description: string; content: string }) => {
    const updatedPrompt = await updatePrompt(id, data);
    setPrompts((prev) => prev.map((prompt) => (prompt.id === id ? updatedPrompt : prompt)));
  };

  const handleDeletePrompt = async () => {
    if (!deletingPrompt) return;
    await deletePrompt(deletingPrompt.id);
    setPrompts((prev) => prev.filter((prompt) => prompt.id !== deletingPrompt.id));
  };

  const handleCopy = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  // Display message and create button if no prompts exist
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="mb-6 gap-2"
        >
          <Plus className="w-5 h-5" /> Create First Prompt
        </Button>
        <p className="text-gray-600 dark:text-gray-300">No prompts found. Get started by creating one!</p>
        <CreatePromptDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreatePrompt={handleCreatePrompt}
        />
      </div>
    );
  }

  return (
    <>
      {/* Button to trigger creating a new prompt */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="gap-2"
        >
          <Plus className="w-5 h-5" /> Create Prompt
        </Button>
      </div>

      <CreatePromptDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreatePrompt={handleCreatePrompt}
      />

      {editingPrompt && (
        <EditPromptDialog
          prompt={editingPrompt}
          open={true}
          onOpenChange={(open) => !open && setEditingPrompt(null)}
          onEditPrompt={handleEditPrompt}
        />
      )}

      {deletingPrompt && (
        <DeletePromptDialog
          promptName={deletingPrompt.name}
          open={true}
          onOpenChange={(open) => !open && setDeletingPrompt(null)}
          onDeletePrompt={handleDeletePrompt}
        />
      )}

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map over the prompts state array */}
        {prompts.map((prompt, index) => (
          <motion.div /* Animation wrapper */
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {/* Shadcn Card */}
            <Card className="group h-full flex flex-col bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700/50 hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-2">
                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    {" "}
                    {/* Allow text to wrap/truncate */}
                    <h2
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate"
                      title={prompt.name}
                    >
                      {prompt.name}
                    </h2>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
                      title={prompt.description}
                    >
                      {prompt.description}
                    </p>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Edit"
                      onClick={() => setEditingPrompt(prompt)}
                    >
                      {" "}
                      <Edit2 className="w-4 h-4" />{" "}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400"
                      title="Delete"
                      onClick={() => setDeletingPrompt(prompt)}
                    >
                      {" "}
                      <Trash2 className="w-4 h-4" />{" "}
                    </Button>
                    <CopyButton text={prompt.content} />
                  </div>
                </div>
                {/* Prompt Content */}
                <div className="flex-grow mt-2 bg-gray-100 dark:bg-gray-700/60 rounded p-3 overflow-auto max-h-40">
                  {" "}
                  {/* Limit height and allow scroll */}
                  <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words font-mono">{prompt.content}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
};
