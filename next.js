import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Layout({ children }) {
	return (
		<>
			{children}
			<Analytics />
			<SpeedInsights />
		</>
	)
}