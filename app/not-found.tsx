import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 text-center">
      <div>
        <p className="gradient-text font-display text-7xl font-semibold">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8"><AnimatedButton href="/">Back to Home</AnimatedButton></div>
      </div>
    </section>
  );
}
