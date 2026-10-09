import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <EmptyState
        code="৪০৪"
        title="পাতাটি খুঁজে পাওয়া যায়নি"
        description="আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
      />
    </div>
  );
}
