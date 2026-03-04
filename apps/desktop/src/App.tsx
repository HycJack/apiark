function App() {
  return (
    <div className="flex h-screen bg-[#0a0a0b] text-[#e4e4e7]">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-[#2a2a2e] bg-[#141416]">
        <div className="flex h-12 items-center gap-2 border-b border-[#2a2a2e] px-4">
          <span className="text-lg font-semibold text-[#3b82f6]">ApiArk</span>
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm text-[#a1a1aa]">
            No collections yet. Open a folder or import a collection to get
            started.
          </p>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex flex-1 flex-col">
        {/* Tab Bar */}
        <div className="flex h-10 items-center border-b border-[#2a2a2e] bg-[#141416] px-2">
          <span className="text-sm text-[#a1a1aa]">
            Open a request from the sidebar, or press Ctrl+N to create one
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-medium text-[#e4e4e7]">
              Welcome to ApiArk
            </h2>
            <p className="text-sm text-[#a1a1aa]">
              The API platform that respects your privacy, your RAM, and your
              Git workflow.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
