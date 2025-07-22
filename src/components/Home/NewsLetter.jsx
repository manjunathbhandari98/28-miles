import { MoveRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8  text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold ">Stay in the Know.</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Subscribe for fresh arrivals, curated edits, and insider-only perks.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-4 w-full flex items-center gap-2 border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-black transition-all"
        >
          <input
            type="email"
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base placeholder:text-gray-400"
            placeholder="Enter your email"
          />
          <button type="submit">
            <MoveRight className="cursor-pointer hover:text-gray-100 transition duration-150" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
