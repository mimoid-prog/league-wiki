import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageHeader from "components/PageHeader";
import Loader from "components/Loader";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import gold from "assets/images/gold.png";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  list-style: none;

  li {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    margin-bottom: 20px;

    .item-image-box {
      margin-right: 8px;

      img {
        min-width: 64px;
        max-width: 64px;
      }
    }

    .item-desc-box {
      p:last-child {
        display: flex;
      }

      .gold-box {
        display: flex;
        align-items: center;

        img {
          margin-right: 5px;
          width: 16px;
        }
      }
    }

    &:hover {
      p:first-child {
        text-decoration: underline;
      }
    }

    p {
      font-size: 18px;
    }

    img {
      max-width: 100%;
      display: block;
      border-radius: 10px;
    }
  }

  ${(props) => props.theme.style.media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;

    li {
      width: auto;
      background: rgb(${(props) => props.theme.theme.darkBg});
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
`;

const DetailsDialog = styled(Dialog)`
  background: rgb(${(props) => props.theme.theme.bg});
  color: ${(props) => props.theme.theme.color};
  width: 90vw;
  position: relative;
  padding: 40px;

  .image-box {
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
    display: block;
  }

  h2 {
    font-size: 30px;
    margin-top: 10px;
  }

  h4 {
    margin-bottom: 10px;
  }

  .desc {
    margin-bottom: 20px;
  }

  .gold-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      margin-right: 5px;
      width: 24px;
    }
  }

  ${(props) => props.theme.style.media.desktop} {
    width: 60vw;

    h2 {
      font-size: 34px;
    }
  }

  ${(props) => props.theme.style.media.large} {
    width: 40vw;
  }
`;

interface DialogImageProps {
  readonly image: string | undefined;
}

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

const Items: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [originalItems, setOriginalItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  interface DetailsProps {
    show: boolean;
    item: {
      id?: string;
      name?: string;
      description?: string;
      text?: string;
      gold?: string;
      sell?: string;
      image?: string;
    };
  }
  const [details, setDetails] = useState<DetailsProps>({
    show: false,
    item: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/10.10.4/data/en_US/item.json",
      );
      const data = await res.json();

      const arrayOfItems = Object.entries(data.data).map(
        ([key, value]: [string, any]) => {
          return {
            id: key,
            name: value.name,
            description: value.description.replace(/<[^>]+>/g, " "),
            text: value.plaintext,
            gold: value.gold.total,
            sell: value.gold.sell,
            image: `https://ddragon.leagueoflegends.com/cdn/10.10.4/img/item/${key}.png`,
          };
        },
      );

      arrayOfItems.sort((a, b) => a.name.localeCompare(b.name));

      setOriginalItems(arrayOfItems);
      setFilteredItems(arrayOfItems);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <PageHeader
        title="Items"
        data={originalItems}
        filterData={setFilteredItems}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <h3>No results</h3>
          ) : (
            <List>
              {filteredItems.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => setDetails({ show: true, item })}
                  >
                    <div className="item-image-box">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-desc-box">
                      <p>{item.name}</p>
                      <div className="gold-box">
                        <div>
                          <img src={gold} alt="Gold icon" />
                        </div>
                        <p>{item.gold}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </List>
          )}

          <DetailsDialog isOpen={details.show}>
            <div className="image-box">
              <img src={details.item.image} alt={details.item.name} />
            </div>
            <div>
              <h2>{details.item.name}</h2>
              <h4>{details.item.text}</h4>
              <p className="desc">{details.item.description}</p>
              <div className="gold-box">
                <div>
                  <img src={gold} alt="Gold icon" />
                </div>
                <p>Buy: {details.item.gold}</p>
              </div>
              <div className="gold-box">
                <div>
                  <img src={gold} alt="Gold icon" />
                </div>
                <p>Sell: {details.item.sell}</p>
              </div>
              <CloseDialog
                onClick={() => setDetails({ show: false, item: {} })}
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

export default Items;
