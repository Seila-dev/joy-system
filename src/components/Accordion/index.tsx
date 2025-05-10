import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface AccordionItem {
    id: number;
    label: string;
    toggled: boolean;
    renderContent: () => React.ReactNode;
    isSuccess: boolean;
}

interface AccordionProps {
    items: AccordionItem[] | null;
    KeepOthersOpen?: boolean;
}

export function Accordion({ items, KeepOthersOpen = false }: AccordionProps) {
    const [accordionItems, setAccordionItems] = useState<AccordionItem[] | null>(null);

    useEffect(() => {
        if (items) {
            setAccordionItems(
                items.map((item) => ({
                    ...item,
                    toggled: false,
                }))
            );
        }
    }, [items]);

    const handleAccordionToggle = (clickedItem: AccordionItem) => {
        setAccordionItems((prevItems) =>
            prevItems?.map((item) => {
                if (item.id === clickedItem.id) {
                    return { ...item, toggled: !item.toggled };
                } else if (!KeepOthersOpen) {
                    return { ...item, toggled: false };
                }
                return item;
            }) || null
        );
    };

    return (
        <AccordionContainer>
            {accordionItems?.map((item) => (
                <AccordionItemWrapper key={item.id} className={item.toggled ? "open" : ""}>
                    <ToggleButton onClick={() => handleAccordionToggle(item)}>
                        <LabelGroup>
                            <Label>{item.label}</Label>
                            <StatusBadge $isSuccess={item.isSuccess}>
                                {item.isSuccess ? "Sucesso" : "Falha"}
                            </StatusBadge>
                        </LabelGroup>
                        <DirectionIndicator>{item.toggled ? "-" : "+"}</DirectionIndicator>
                    </ToggleButton>
                    <ContentArea className={item.toggled ? "open" : ""}>
                        {item.toggled && <div>{item.renderContent()}</div>}
                    </ContentArea>
                </AccordionItemWrapper>
            ))}
        </AccordionContainer>
    );
}

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AccordionItemWrapper = styled.div`
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  background:  #222;
`;

const StatusBadge = styled.span<{ $isSuccess: boolean }>`
  align-self: flex-start;
  background-color: ${({ $isSuccess }) => ($isSuccess ? "#4caf50" : "#f44336")};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: #ccc;
  background-color: var(--background, #fff);
  transition: 0.2s ease-out;

  &:hover {
    background-color: #222;
  }
`;

const LabelGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  gap: 10px;
`;

const Label = styled.p`
  margin: 0;
`;

const DirectionIndicator = styled.span`
  font-size: 1.25rem;
  color: var(--greenText, #2ecc71);
`;

const ContentArea = styled.div`
  max-height: 0;
  overflow: hidden;
  padding: 0 1rem;
  transition: max-height 0.3s ease, padding 0.3s ease;

  &.open {
    max-height: 100%;
    padding: 0.2rem;
  }
`;
