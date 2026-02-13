
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Banknote, Clock, Pencil, Trash2, CalendarDays, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface JobItemCardProps {
    job: {
        id: number;
        title: string;
        tags: string | null;
        location: string | null;
        minSalary: number | null;
        maxSalary: number | null;
        salaryCurrency: string | null;
        salaryPeriod: string | null;
        jobType: string | null;
        createdAt: Date;
    };
}

export default function JobItemCard({ job }: JobItemCardProps) {
    const tagsList = job.tags ? job.tags.split(",").map(tag => tag.trim()) : [];

    const formatSalary = () => {
        if (!job.minSalary && !job.maxSalary) return "Not specified";
        const currency = job.salaryCurrency || "";
        const period = job.salaryPeriod ? `/${job.salaryPeriod}` : "";
        
        if (job.minSalary && job.maxSalary) {
            return `${currency} ${job.minSalary} - ${job.maxSalary} ${period}`;
        }
        return `${currency} ${job.minSalary || job.maxSalary} ${period}`;
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold mb-1">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {job.jobType && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Briefcase size={12} />
                                    {job.jobType}
                                </Badge>
                            )}
                            {tagsList.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline">{tag}</Badge>
                            ))}
                            {tagsList.length > 3 && (
                                <Badge variant="outline">+{tagsList.length - 3}</Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Banknote size={16} />
                        <span>{formatSalary()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2 border-t mt-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/employer/myjobs/${job.id}`}>
                        <Eye size={16} className="mr-2" />
                        View
                    </Link>
                </Button>
                <Button variant="destructive" size="sm">
                    <Trash2 size={16} className="mr-2" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
