export default function LawyerProfileSettingsPage() {
  const mock = {
    name: "Adv. Ananya Sharma",
    license: "MH/2015/12345",
    location: "Mumbai, Maharashtra",
    practices: ["Property", "Family", "Civil"],
    experienceYears: 9,
    contact: { email: "ananya@example.com", phone: "+91-9876543210" },
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Lawyer Profile</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Review and update your public profile details.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Current details</h2>
          <ul className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li><span className="text-zinc-500">Name:</span> {mock.name}</li>
            <li><span className="text-zinc-500">License:</span> {mock.license}</li>
            <li><span className="text-zinc-500">Location:</span> {mock.location}</li>
            <li><span className="text-zinc-500">Practice areas:</span> {mock.practices.join(", ")}</li>
            <li><span className="text-zinc-500">Experience:</span> {mock.experienceYears}+ yrs</li>
            <li><span className="text-zinc-500">Email:</span> {mock.contact.email}</li>
            <li><span className="text-zinc-500">Phone:</span> {mock.contact.phone}</li>
          </ul>
        </div>

        <form className="rounded-lg border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Edit profile</h2>
          <div className="mt-3 grid gap-3">
            <div>
              <label className="block text-xs font-medium">Name</label>
              <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" defaultValue={mock.name} />
            </div>
            <div>
              <label className="block text-xs font-medium">License number</label>
              <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" defaultValue={mock.license} />
            </div>
            <div>
              <label className="block text-xs font-medium">Location</label>
              <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" defaultValue={mock.location} />
            </div>
            <div>
              <label className="block text-xs font-medium">Practice areas (comma separated)</label>
              <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" defaultValue={mock.practices.join(", ")} />
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Save</button>
              <span className="text-xs text-zinc-500">Demo only</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
