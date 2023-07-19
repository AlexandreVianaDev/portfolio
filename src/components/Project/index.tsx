import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      );

      const json = await data.json();

      setRepositories(json);

      console.log(json);

      return json;
    };

    fetchData();
  }, []);

  const compareRepo = (repoA: ReposType, repoB: ReposType) => {
    const priorityA =
      repoA.topics && repoA.topics.includes("project-for-portfolio");
    const priorityB =
      repoB.topics && repoB.topics.includes("project-for-portfolio");

    if (priorityA && !priorityB) {
      return -1;
    } else if (!priorityA && priorityB) {
      return 1;
    } else {
      return 0;
    }
  };

  const compareTopics = (topics: string[]) => {
    const techs = [
      "react",
      // "reactjs",
      "node",
      // "nodejs",
      "express",
      // "expressjs",
      "python",
      "django",
      "django-rest-framework",
      "postgresql",
      "mysql",
      "next",
      // "nextjs",
      "nest",
      // "nestjs",
      "javascript",
      "typescript",
      "styled-components",
    ];

    const priorityA: string[] = [];
    const priorityB: string[] = [];

    topics.forEach((topic) => {
      if (techs.includes(topic)) {
        priorityA.push(topic);
      } else {
        priorityB.push(topic);
      }
    });

    return [...priorityA, ...priorityB];
  };

  return (
    <>
      {repositories &&
        repositories.sort(compareRepo)?.map?.((repository) => {
          return (
            repository.name != "AlexandreVianaDev" && (
              <ProjectWrapper key={repository.id}>
                <ProjectTitle
                  as="h2"
                  type="heading3"
                  css={{ marginBottom: "$3" }}
                  color="grey4"
                >
                  {repository.name}
                </ProjectTitle>

                <ProjectStack>
                  <Text type="body2" color="grey2">
                    Principais Tecnologias
                  </Text>
                  {repository.topics ? (
                    compareTopics(repository.topics).map((topic, index) => {
                      return (
                        topic !== "project-for-portfolio" &&
                        index < 3 && (
                          <ProjectStackTech>
                            <Text color="grey2" type="body2">
                              {topic}
                            </Text>
                          </ProjectStackTech>
                        )
                      );
                    })
                  ) : (
                    <ProjectStackTech>
                      <Text color="grey2" type="body2">
                        Nenhum tópico encontrado
                      </Text>
                    </ProjectStackTech>
                  )}
                </ProjectStack>

                <Text type="body1" color="grey2">
                  {repository.description?.substring(0, 129)}
                </Text>
                <ProjectLinks>
                  <ProjectLink target="_blank" href={repository.html_url}>
                    <FaGithub /> Github
                  </ProjectLink>
                  {repository.homepage && (
                    <ProjectLink target="_blank" href={repository.homepage}>
                      <FaShare /> Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectWrapper>
            )
          );
        })}
    </>
  );
};
