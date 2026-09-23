interface Props {
    fileName: string;
    fileSize: number;
    totalSkills: number;
};

export default function ResumeOverview({
    fileName,
    fileSize,
    totalSkills,
}: Props) {
    const size = (fileSize / 1024).toFixed(1);

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                Resume Overview
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

                <div>
                    <p className="text-sm text-muted-foreground">
                        File Name
                    </p>

                    <p className="font-medium break-all">
                        {fileName}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        File Size
                    </p>

                    <p className="font-medium">
                        {size} KB
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Skills Found
                    </p>

                    <p className="font-medium">
                        {totalSkills}
                    </p>
                </div>

            </div>
        </div>
    );
}