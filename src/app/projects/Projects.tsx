import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
    const [repos, setRepos] = useState<any>([]);
    const [loading, setLoading] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        const getReposAndReadmes = async () => {
            setLoading(true)
            const res = await fetch('https://api.github.com/users/arno-boenders/repos');
            const reposData = await res.json();

            // Fetch README for each repo in parallel
            const reposWithReadmes = await Promise.all(
                reposData.map(async (repo: any) => {
                    try {
                        const readmeRes = await fetch(`https://api.github.com/repos/arno-boenders/${repo.name}/readme`, {
                            headers: {
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                                Accept: 'application/vnd.github.v3+json'
                            }
                        });
                        const readmeData = await readmeRes.json();

                        const readmeText = readmeData.content
                            ? atob(readmeData.content)
                            : "No README available";

                        return {
                            ...repo,
                            readme: readmeText,
                        };
                    } catch (error) {
                        return {
                            ...repo,
                            readme: "Failed to load README",
                        };
                    }
                })
            );

            setRepos(reposWithReadmes);
            setLoading(false)
        };

        getReposAndReadmes();
    }, []);
    const filterdRepos = repos.slice(1)

    if (loading) {
        return (
            <div className={`flex items-center justify-center h-screen ${theme.background}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }
    return (
        <div className={`px-4 pr pb-8 ${theme.background}`}>
            {filterdRepos?.map((repo: any, index: number) => (
                <div key={index} className="mb-8 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center mb-1">
                        <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-sm"></div>
                        </div>
                        <div>
                            <div className={`text-sm ${theme.foreground}`}>{repo.html_url}</div>
                        </div>
                    </div>
                    <Link href={repo.html_url} className="text-xl text-blue-400 hover:underline cursor-pointer mb-1 font-normal">
                        {repo.name}
                    </Link>
                    <p className={`text-sm ${theme.foreground} leading-6`}>
                        {repo.readme.slice(0, 300)}...
                    </p>
                </div>
            ))}
        </div>
    );
}
