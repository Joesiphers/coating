import Image from "next/image";

export default function EditableTr({
  item,
  handleDeleteImage,
  handleImageUpload,
  handleInputChange,
  tdcss,
  files,
  handleSave,
  handleCancel,
}) {
  return (
    <>
      <td className={tdcss + " w-2/12"}>{item.id}</td>
      <td className={tdcss + " w-2/12"}>
        <input
          className="w-full border-solid border-2 border-indigo-300"
          type="text"
          value={item.title}
          onChange={(e) => handleInputChange(item.id, "title", e.target.value)}
        />
      </td>

      <td className={tdcss + " w-2/12"}>
        <textarea
          className="w-full border-solid border-2 border-indigo-300"
          value={item.subtitle}
          onChange={(e) =>
            handleInputChange(item.id, "subtitle", e.target.value)
          }
        />
      </td>
      <td className={tdcss + " w-2/12"}>
        <input
          className="w-full border-solid border-2 border-indigo-300"
          type="file"
          multiple
          onChange={(e) => handleImageUpload(e, item.id)}
        />
        {files[0] &&
          files.map(
            (i, index) =>
              item.id === i.id && (
                <span key={i.name + index}>
                  <img
                    src={i.url}
                    alt="img"
                    width={38}
                    height={38}
                    className="inline"
                  />
                  <button onClick={() => handleDeleteImage(i.id, i.url)}>
                    Del
                  </button>
                </span>
              ),
          )}
        {item.imgurl.map((url, index) => (
          <span key={index}>
            <img
              src={url}
              alt="img"
              width={38}
              height={38}
              className="inline"
            />
            <button onClick={() => handleDeleteImage(item.id, url)}>Del</button>
          </span>
        ))}
      </td>
      <td className={tdcss + " w-2/12"}>
        <textarea
          className="w-full border-solid border-2 border-indigo-300"
          rows={5}
          type="text"
          value={item.description}
          onChange={(e) =>
            handleInputChange(item.id, "description", e.target.value)
          }
        />
      </td>
      <td className={tdcss}>
        <span>
          <button onClick={() => handleSave(item.id)}>Save</button>
          <button onClick={() => handleCancel(item.id)}>Cancel</button>
        </span>
      </td>
    </>
  );
}
