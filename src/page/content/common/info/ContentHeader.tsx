import {
  SELECTOR_MEAT_LIST,
  SELECTOR_RECRUIT_SUB_TYPE,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_REGION_LIST,
  SELECTOR_SUB_REGION_LIST,
  SELECTOR_TOGETHER_TYPE_LIST,
} from "common/constant";
import { toDate, toNumber } from "common/tool";
import { IStudyBoardContent } from "types/board";
import "./ContentHeader.scss";

interface IProps {
  data: IStudyBoardContent | undefined;
  onModifyContent: () => void;
  onDeleteContent: () => void;
  userId: number;
}
export default function ContentHeader({
  data,
  onModifyContent,
  onDeleteContent,
  userId,
}: IProps) {
  const contentType1 = SELECTOR_RECRUIT_TYPE[data?.contentType1 || 0];
  const contentType2 =
    SELECTOR_RECRUIT_SUB_TYPE[data?.contentType1 || 0][data?.contentType2 || 0];

  const loc1 = data?.location1;
  const loc2 = data?.location2;
  const loc3 = data?.location3;

  const onlineType = toNumber(loc1);
  const region = toNumber(loc2);
  const subRegion = toNumber(loc3);

  const regionTxt1 =
    onlineType === 1
      ? `${SELECTOR_MEAT_LIST[onlineType].label}`
      : `${SELECTOR_REGION_LIST[region].label}`;

  const regionTxt2 =
    onlineType === 1
      ? ``
      : `${SELECTOR_SUB_REGION_LIST[region][subRegion].label}`;

  return (
    <section className="content__header__container">
      <div className="study__content__header">
        <h2 className="study__content__title">{data?.title || ""}</h2>

        <div className="end study__content__sub">
          <div className="row study__content__sub__info">
            <span className="study__content__view">
              작성자 ({data?.writer?.nickname || ""})
            </span>
            <span className="study__content__view">뷰 {data?.view || 0}</span>
            <span className="study__content__like">추천 {data?.like || 0}</span>
            <span className="study__content__dislike">
              비추천 {data?.dislike || 0}
            </span>
          </div>
        </div>

        <p className="bold w100 study__content__dateline">
          {toDate(data?.createdAt, "YYYY.MM.DD")}
        </p>

        {data?.writer.id === userId && (
          <div className="end study__content__subline">
            <button onClick={onModifyContent}>수정</button>
            <button onClick={onDeleteContent}>삭제</button>
          </div>
        )}
      </div>

      <div className="study__content__sub__header">
        <div className="option__box">
          <div className="option__box__type">종류</div>
          <div>
            {
              SELECTOR_TOGETHER_TYPE_LIST[toNumber(data?.togetherType || 1)]
                .label
            }
          </div>
          <div className="option__box__type">모집</div>
          <div>
            <span>{contentType1.label}</span>
            <span>{contentType2.label}</span>
          </div>
          <div></div>

          <div className="option__box__type">장소</div>
          <div>
            <span>{regionTxt1}</span>
            <span>{regionTxt2}</span>
          </div>
          <div className="option__box__type"></div>
          <div></div>
          <div></div>

          <div className="option__box__type">인원</div>
          <div>{data?.persons || 0}명</div>
          <div className="option__box__type">기간</div>
          <div>{toDate(data?.period) || "미정"}</div>
          <div></div>
        </div>

        <div className="bold">태그</div>
        <div className="row option__tag__list">
          {data?.tagList?.map((val, i) => (
            <span key={i}># {val}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
