import { FC, useMemo, useRef, useState } from "react";
import "./Editor.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUploadTmpImageMutation } from "redux/service/study/board";

interface IProps {}
export default function Editor() {
  const [uploadTmpImage, uploadState] = useUploadTmpImageMutation();

  const [contents, setContents] = useState("");

  const editorRef = useRef<ReactQuill | null>(null);

  const imageHandler = async () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const formData = new FormData();

    if (!editorRef.current) return;

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;

      console.log(file);
      if (file !== null) {
        formData.append("image", file[0]);

        // call upload api hook
        uploadTmpImage(formData)
          .unwrap()
          .then((url) => {
            const editorInstance = editorRef.current?.getEditor();

            // 현재 커서 위치를 반환
            const index = editorInstance?.getSelection()?.index;

            if (index !== null && index !== undefined) {
              // editorInstance?.setSelection(index, 2);
              editorInstance?.clipboard.dangerouslyPasteHTML(
                index,
                `<img src=${process.env.REACT_APP_API_BASE_URL}/${url} alt="이미지 업로드" />`
              );
            }
          })
          .catch((error) => console.error("rejected", error));
      }
    };
  };

  /**
   * react-quill
   * option example

   * modules : 커스텀 toolbar 설정 및 handler 연결
   * placeholder
   * readOnly : 에디터를 읽기 전용 여부 설정
   * theme : 에디터 테마 설정
    - bubble
    - snow (그 외, 비공식적으로 추가되는게 있을 수 있음)
   * container: 각 toolbar 버튼 넣을 것들 배열로 설정
   * handlers: 각 버튼 마다 핸들러를 적용할 수 있다. (key: 버튼 이름)
   */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div>
      <ReactQuill
        ref={editorRef}
        modules={modules}
        theme="snow"
        value={contents}
        onChange={setContents}
      />
    </div>
  );
}
