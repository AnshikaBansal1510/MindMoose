import React from 'react'

const TherapistPreview = () => {
  return (
    <div className="mb-6 flex-1 space-y-4 overflow-y-auto">
      {/* Bot Message */}
      <div className="mb-4 flex justify-end">
        <div className="bg-black text-white max-w-xs rounded-2xl rounded-tr-sm px-4 py-2">
          <p className="text-sm font-medium">
          Hello 🤍 I’m here to listen. You can talk freely and safely. What’s been on your mind today?
          </p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex justify-start">
        <div className="bg-gray-200/45 text-foreground max-w-xs rounded-2xl rounded-tl-sm px-4 py-2">
          <p className="text-sm">
           I’m feeling tired mentally, and I don’t really know why.
          </p>
        </div>
      </div>

      {/* Input Field */}
      <div className="bg-white flex items-center gap-2 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Ask a question..."
          className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
          disabled
        />
      </div>
    </div>    
  )
}

export default TherapistPreview