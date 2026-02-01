export default function LawyerNewCasePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">New Case</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Enter details to create a new case (demo form).</p>

      <form className="mt-6 grid gap-3 rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <label className="block text-xs font-medium">Title</label>
          <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" placeholder="e.g., Sale Deed Dispute" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium">Client name</label>
            <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
          </div>
          <div>
            <label className="block text-xs font-medium">Status</label>
            <select className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800">
              <option>Open</option>
              <option>In progress</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium">Description</label>
          <textarea rows={4} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Create</button>
          <span className="text-xs text-zinc-500">Demo only</span>
        </div>
      </form>
    </div>
  );
}
