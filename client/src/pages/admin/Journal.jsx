import React, { useState } from 'react'
import { Notebook, Sparkles, Trash2 } from 'lucide-react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { createJournal, deleteJournal, getJournals, journalPrompt } from '../../config/api';
import toast from 'react-hot-toast';

const Journal = () => {

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  const {data: journals = [], isLoading: journalLoading, error: journalError} = useQuery({  

    queryKey: ["journal"],
    queryFn: getJournals,
    onError: (error) => {
      toast.error("Failed to load journals!")
    }
  });

  const { mutate: createMutation, isPending: createJournalLoading} = useMutation({
    mutationFn: createJournal,
    onSuccess: () => {
      toast.success("Journal created successfully");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["journal"] });
    },
  });

  const {
    mutate: deleteJournalMutation,
    isPending: deleteJournalLoading,
  } = useMutation({
    mutationFn: deleteJournal,
    onSuccess: () => {
      toast.success("Journal deleted");
      queryClient.invalidateQueries({ queryKey: ["journal"] });
    },
  });

  const { mutate: promptMutation, isPending: promptLoading, error: promptError } = useMutation({
    mutationFn: journalPrompt,
    onSuccess: (data) => {
      if(data.success) {
        toast.success("Prompt created successfully");
        setPrompt(data.prompt)
      } 
      else {
        toast.error(data.message);
      }
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message
      );
    },
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?');

    if (!confirmed) return;

    deleteJournalMutation(id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg bg-[#fff7f9] text-[#3f2a32] border border-[#e8cdd6]">
  
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#f2d6df] flex items-center justify-center">
          <Notebook className="w-5 h-5 text-[#7a2e4d]" />
        </div>
        <h1 className="text-xl font-semibold">Your Journal</h1>
      </div>
  
      {/* Journal Input */}
      <textarea
        className="w-full min-h-[140px] p-4 rounded-xl resize-none
                   bg-white border border-[#e5c3cf]
                   focus:outline-none focus:ring-2 focus:ring-[#c97a96]
                   placeholder:text-[#9b6b7d]"
        placeholder="Take a deep breath… write whatever feels true right now."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
  
      {/* Save Button */}
      <button
        onClick={() => createMutation(content)}
        className="mt-4 px-6 py-2 rounded-xl font-medium
                   bg-[#AA336A] text-white
                   hover:bg-[#682743] transition"
      >
        Save Journal
      </button>
  
      {/* Reflection Prompt */}
      <div className="mt-8 p-4 rounded-xl bg-[#f7e8ee] border border-[#e4bccc]">
        <button
          onClick={() => setShowConsent(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-[#86c4b0] text-white hover:bg-[#86c4b0] border border-[#7a2e4d]"
        >
          <Sparkles className="w-4 h-4" />
          Reflect and Get Prompt
        </button>
        <p className="mt-3 text-xs text-[#7a6a71] italic">
          Your journal reflections are processed by AI to generate insights.
          We do not store or sell your data.
        </p>

        {showConsent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-sm rounded-2xl bg-[#fff7f9] p-6 shadow-xl border border-[#e8cdd6]">
              
              <h3 className="text-lg font-semibold text-[#3f2a32] mb-2">
                AI Reflection Consent
              </h3>

              <p className="text-sm text-[#6f4a57] mb-4 leading-relaxed">
                To help you reflect and feel better, we use AI to gently analyze your
                recent journal entries.
                <br /><br />
                Your entries are processed securely and are never stored or sold.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConsent(false)}
                  className="px-4 py-2 rounded-lg text-sm
                            bg-transparent border border-[#d8a9ba]
                            text-[#7a2e4d] hover:bg-[#f3dde6]"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setShowConsent(false);
                    promptMutation(journals);
                  }}
                  className="px-4 py-2 rounded-lg text-sm
                            bg-[#AA336A] text-white hover:bg-[#8f2a59]"
                >
                  I Agree
                </button>
              </div>
            </div>
          </div>
        )}

  
        {promptLoading && (
          <p className="text-sm mt-3 text-[#7a6a71]">
            Preparing something thoughtful for you…
          </p>
        )}
  
        {prompt && (
          <p className="mt-4 text-[#3f665a] italic border-l-4 pl-4 border-[#8fbdb0]">
            {prompt}
          </p>
        )}
      </div>
  
      {/* Previous Entries */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Past Entries</h2>
  
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
          {journals.map((j) => (
            <div
              key={j._id}
              className="relative p-4 rounded-xl
                         bg-white border border-[#ead1da] shadow-sm"
            >
              <p className="text-xs text-[#8a6b77] mb-2">
                {new Date(j.createdAt).toLocaleString()}
              </p>
  
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {j.content}
              </p>
  
              <button
                onClick={() => handleDelete(j._id)}
                className="absolute top-3 right-3 text-[#b24a5f] hover:text-[#8f3649]"
                title="Delete entry"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Journal