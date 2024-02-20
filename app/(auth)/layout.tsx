import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<section className="auth min-w-full min-h-screen flex justify-center items-center bg-yellow-500">
			<div className="w-1/2 mx-auto flex justify-center rounded-md border-red-400">
			<div className="flex flex-col items-center">
			<h2 className="text-3xl font-semibold mb-12">Sign-in with your account</h2>
				{children}
			</div>
			</div>
		</section>
	);
}	

export default Layout;
