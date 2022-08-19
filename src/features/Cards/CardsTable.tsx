import * as React from 'react';
import {CardsTableHead} from './CardsTableHead';
import {CardsTableBody} from './CardsTableBody';
import {initApp} from "../../app/selectors";
import {useAppSelector} from "../../common/utils/hooks";
import {WithoutResultPage} from "../../common/components/WithoutResultsPage/WithoutResultPage";
import { SecondaryPreloader } from '../../common/components/Preloader/secondaryPreloader/SecondaryPreloader';
import {allCards} from "./cardsReducer/selectors";
import style from '../DeskCards/DeskComponents/BasicTable/BasicTable.module.css'

type CardsTablePropsType = {
  packID: string | undefined
}

export const CardsTable: React.FC<CardsTablePropsType> = ({packID}) => {
  const cards = useAppSelector(allCards.cards);
  const initTable = useAppSelector(initApp.initTable);

  if (cards?.length === 0) {
    return <WithoutResultPage itemName={'Cards'}/>
  }

  return (
      <div>
        <div className={style.scrollTable}>
          <CardsTableHead/>
        </div>

        {initTable === 'initializing'
            ? <SecondaryPreloader/>
            : <div className={style.scrollTableBody}>
              <CardsTableBody packID={packID}/>
            </div>
        }
      </div>
  )
};

