'use client'
import { useRef, useState } from 'react'

export default function FileUpload({ files, onFiles }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function addFiles(newFiles) {
    const list = Array.from(newFiles).filter(f =>
      ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
        .includes(f.type) || f.name.endsWith('.txt') || f.name.endsWith('.pdf') || f.name.endsWith('.docx')
    )
    onFiles([...files, ...list])
  }

  function removeFile(idx) {
    onFiles(files.filter((_, i) => i !== idx))
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
        <p className="text-gray-600 font-medium">Drag files here or click to browse</p>
        <p className="text-gray-400 text-sm mt-1">PDF, DOCX, or TXT — up to 10 MB each</p>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm">
              <span className="text-gray-700 truncate">{f.name}</span>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeFile(i) }}
                className="ml-3 text-gray-400 hover:text-red-500 shrink-0"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
