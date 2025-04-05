// app/prompts/components/prompts-grid.tsx
"use client"; // Mark as Client Component for state and interaction

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Import Shadcn Card
import { motion } from "framer-motion";
import { Copy, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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
  // Placeholder state for copy confirmation (implement later)
  // const [copiedId, setCopiedId] = useState<number | null>(null);

  // Display message and create button if no prompts exist
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <Button
          onClick={() => {
            /* Add create logic */
          }}
          className="mb-6 gap-2"
        >
          <Plus className="w-5 h-5" /> Create First Prompt
        </Button>
        <p className="text-gray-600 dark:text-gray-300">No prompts found. Get started by creating one!</p>
      </div>
    );
  }

  return (
    <>
      {/* Button to trigger creating a new prompt */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => {
            /* Add create logic */
          }}
          className="gap-2"
        >
          <Plus className="w-5 h-5" /> Create Prompt
        </Button>
      </div>

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
            <Card className="h-full flex flex-col bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700/50">
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
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      title="Edit"
                      onClick={() => console.log("Edit", prompt.id)}
                    >
                      {" "}
                      <Edit2 className="w-4 h-4" />{" "}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      title="Delete"
                      onClick={() => console.log("Delete", prompt.id)}
                    >
                      {" "}
                      <Trash2 className="w-4 h-4" />{" "}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      title="Copy"
                      onClick={() => console.log("Copy", prompt.id)}
                    >
                      {" "}
                      <Copy className="w-4 h-4" />{" "}
                    </Button>
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
