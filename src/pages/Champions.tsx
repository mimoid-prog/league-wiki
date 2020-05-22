import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "layouts/ContentLayout";
import Loader from "components/Loader";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const List = styled.ul`
  display: grid;
  grid-gap: 20px 0;
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
      font-size: 22px;
    }

    img {
      max-width: 100%;
      display: block;
      border-radius: 10px;
    }
  }

  ${(props) => props.theme.style.media.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px 20px;
  }

  ${(props) => props.theme.style.media.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const DetailsDialog = styled(Dialog)`
  background: rgb(${(props) => props.theme.theme.bg});
  color: ${(props) => props.theme.theme.color};
  width: 90vw;
  position: relative;

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
  readonly image: string;
}

const DialogImage = styled.div<DialogImageProps>`
  display: none;

  ${(props) => props.theme.style.media.desktop} {
    display: block;
    background-image: url(${(props) => props.image});
    background-size: auto 100%;
    background-position: 50%;
    border-radius: 10px;
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

const Champions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [champions, setChampions] = useState<any[]>([]);
  const [details, setDetails] = useState({ show: false, id: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/10.10.3216176/data/en_US/champion.json",
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
            image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${value.id}_0.jpg`,
          };
        },
      );

      setChampions(arrayOfChampions);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout title="Champions">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <List>
            {champions.map((champ, index) => {
              return (
                <li
                  key={champ.id}
                  onClick={() => setDetails({ show: true, id: index })}
                >
                  <img src={champ.image} alt={champ.name} />
                  <p>{champ.name}</p>
                </li>
              );
            })}
          </List>
          <DetailsDialog isOpen={details.show}>
            <DialogImage image={champions[details.id].image} />
            <div>
              <h2>{champions[details.id].name}</h2>
              <h3>{champions[details.id].title}</h3>
              <h4>{champions[details.id].tags}</h4>
              <p>{champions[details.id].blurb}</p>
              <CloseDialog onClick={() => setDetails({ show: false, id: 0 })}>
                Close
              </CloseDialog>
            </div>
          </DetailsDialog>
        </>
      )}
    </Layout>
  );
};

export default Champions;
