import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageHeader from "components/PageHeader";
import Loader from "components/Loader";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px 10px;
  max-width: 100%;
  list-style: none;

  li {
    cursor: pointer;
    overflow: hidden;

    &:hover {
      p {
        text-decoration: underline;
      }
    }

    p {
      margin-top: 6px;
      font-size: 20px;
    }

    img {
      max-width: 100%;
      display: block;
      border-radius: 10px;
    }
  }

  ${(props) => props.theme.style.media.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px 20px;
  }

  ${(props) => props.theme.style.media.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  ${(props) => props.theme.style.media.large} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const DetailsDialog = styled(Dialog)`
  background: rgb(${(props) => props.theme.theme.bg});
  color: ${(props) => props.theme.theme.color};
  width: 90vw;
  position: relative;
  padding: 40px;

  img {
    max-width: 100%;
    display: block;
  }

  h2 {
    font-size: 30px;
    margin-top: 10px;
  }

  h3,
  h4 {
    margin-bottom: 10px;
  }

  ${(props) => props.theme.style.media.desktop} {
    width: 60vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 40px;

    h2 {
      font-size: 34px;
    }
  }
`;

interface DialogImageProps {
  readonly image: string | undefined;
}

const DialogImage = styled.div<DialogImageProps>`
  display: none;

  ${(props) => props.theme.style.media.desktop} {
    display: block;
    background-image: url(${(props) => props.image});
    background-size: auto 100%;
    background-position: 50%;
  }
`;

const CloseDialog = styled.button`
  background: none;
  border: 2px solid rgb(${(props) => props.theme.theme.reverse});
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 25px;
  color: ${(props) => props.theme.theme.color};
  cursor: pointer;
  margin-top: 20px;
  margin-left: auto;
  display: block;
`;

const Champions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [originalChampions, setOriginalChampions] = useState<any[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<any[]>([]);

  interface DetailsProps {
    show: boolean;
    champ: {
      id?: string;
      name?: string;
      blurb?: string;
      title?: string;
      tags?: string;
      image?: string;
    };
  }
  const [details, setDetails] = useState<DetailsProps>({
    show: false,
    champ: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/10.10.3216176/data/en_US/champion.json",
      );
      const data = await res.json();

      const arrayOfChampions = Object.entries(data.data).map(
        ([key, value]: [string, any]) => {
          let newTags = "";

          value.tags.forEach((tag: string, i: number) => {
            newTags += tag;
            if (value.tags.length - 1 !== i) newTags += ", ";
          });

          return {
            id: value.id,
            name: value.name,
            blurb: value.blurb,
            title: value.title,
            tags: newTags,
            image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${value.id}_0.jpg`,
          };
        },
      );

      setOriginalChampions(arrayOfChampions);
      setFilteredChampions(arrayOfChampions);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <PageHeader
        title="Champions"
        data={originalChampions}
        filterData={setFilteredChampions}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredChampions.length === 0 ? (
            <h3>No results</h3>
          ) : (
            <List>
              {filteredChampions.map((champ) => {
                return (
                  <li
                    key={champ.id}
                    onClick={() => setDetails({ show: true, champ })}
                  >
                    <img src={champ.image} alt={champ.name} />
                    <p>{champ.name}</p>
                  </li>
                );
              })}
            </List>
          )}

          <DetailsDialog isOpen={details.show}>
            <DialogImage image={details.champ.image} />
            <div>
              <h2>{details.champ.name}</h2>
              <h3>{details.champ.title}</h3>
              <h4>{details.champ.tags}</h4>
              <p>{details.champ.blurb}</p>
              <CloseDialog
                onClick={() => setDetails({ show: false, champ: {} })}
              >
                Close
              </CloseDialog>
            </div>
          </DetailsDialog>
        </>
      )}
    </>
  );
};

export default Champions;
