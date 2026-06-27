"use client";

export default function ConsultantOnboardingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Consultant Onboarding</h1>
      <p className="mt-2 text-sm text-zinc-600">Provide your practice details to offer consulting services.</p>
      <form className="mt-6 space-y-3 rounded-lg border bg-white p-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium">Expertise</label>
          <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium">Office location</label>
          <input className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
        </div>
        <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Submit</button>
      </form>
    </div>
  );
}
