import { AuthWrapper } from "@/components/custom/auth-wrapper";

export const TopBar = () => {
  return (
    <div className="w-full flex bg-yellow-300">
      Streak
      <AuthWrapper />
    </div>
  );
};
