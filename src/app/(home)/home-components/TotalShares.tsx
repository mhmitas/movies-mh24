import { cn } from "@/lib/utils"
import { FaFacebook, FaFacebookMessenger, FaReddit, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6"

export default function SocialShare({
    className,
}: { className?: string }) {

    const totalShares = 5000
    const shares = {
        facebook: 2300,
        twitter: 898,
        whatsapp: 156,
        messenger: 219,
        reddit: 602,
        telegram: 0,
    };

    // Format numbers to show k for thousands
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
        }
        return num.toString()
    }

    return (
        <div className={cn("flex w-full items-center gap-2 justify-center", className)}>
            <div className="flex flex-col items-center justify-center px-4 py-2">
                <span className="text-lg font-semibold">{formatNumber(totalShares)}</span>
                <span className="text-xs">Shares</span>
            </div>

            <div className="flex flex-wrap">
                {/* Facebook */}
                <span
                    className="flex items-center justify-center gap-2 bg-[#1877F2] px-4 py-2 transition-opacity hover:opacity-90"
                    aria-label="Share on Facebook"
                >
                    <FaFacebook size={18} />
                    <span>{formatNumber(shares.facebook || 0)}</span>
                </span>

                {/* Twitter/X */}
                <span
                    className="flex items-center justify-center gap-2 bg-[#000000] px-4 py-2 transition-opacity hover:opacity-90"
                    aria-label="Share on Twitter"
                >
                    <FaXTwitter size={18} />
                    <span>{formatNumber(shares.twitter || 0)}</span>
                </span>

                {/* WhatsApp */}
                <span
                    className="flex items-center justify-center gap-2 bg-[#25D366] px-4 py-2 transition-opacity hover:opacity-90"
                    aria-label="Share on WhatsApp"
                >
                    <FaWhatsapp />
                    <span>{formatNumber(shares.whatsapp || 0)}</span>
                </span>

                {/* Messenger */}
                <span
                    className="flex items-center justify-center gap-2 bg-[#0084FF] px-4 py-2 transition-opacity hover:opacity-90"
                    aria-label="Share on Messenger"
                >
                    <FaFacebookMessenger size={18} />
                    <span>{formatNumber(shares.messenger || 0)}</span>
                </span>

                {/* Reddit */}
                <span
                    className="flex items-center justify-center gap-2 bg-[#FF4500] px-4 py-2 transition-opacity hover:opacity-90"
                    aria-label="Share on Reddit"
                >
                    <FaReddit />
                    <span>{formatNumber(shares.reddit || 0)}</span>
                </span>

                {/* Telegram */}
                <span
                    className="flex items-center justify-center gap-2 bg-[#0088cc] px-4 py-2 transition-opacity hover:opacity-90"
                    aria-label="Share on Telegram"
                >
                    <FaTelegram size={18} />
                    <span>{shares.telegram ? formatNumber(shares.telegram) : ""}</span>
                </span>
            </div>
        </div>
    )
}
