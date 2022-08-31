import React, { useMemo, useRef, useState } from "react";
import {
  SketchPad,
  TOOL_ELLIPSE,
  TOOL_LINE,
  TOOL_PENCIL,
  TOOL_RECTANGLE,
} from "../components/SketchPad";

import { BASE_URL } from "../utils";
import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { client } from "../utils/client";
import router from "next/router";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";

const Sketch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [nftAsset, setNftAsset] = useState<SanityAssetDocument | undefined>();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [showModal, setShowModal] = useState();
  const [tool, setTool] = useState(TOOL_PENCIL);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState("#000000");
  const [fill, setFill] = useState(false);
  const [fillColor, setFillColor] = useState("#444444");
  const [items, setItems] = useState([]);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();

  const canvas = document.getElementsByClassName("canvas")[0];

  const handleClear = () => {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const uploadNft = async () => {
    let data = canvas.toBlob(
      (blob: File | Blob | Buffer | ReadableStream<any>) => {
        client.assets
          .upload("file", blob, {
            contentType: "image/png",
            filename: caption,
          })
          .then((data) => {
            setNftAsset(data);
            setIsLoading(false);
          });
      },
      "image/png",
      0.5
    );
  };

  const handlePost = async () => {
    let response = await uploadNft();
    if (true) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        type: "nft",
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: nftAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg h-full xl:h-[60vh] w-[75%] flex flex-wrap justify-between">
        <div className="pt-5 px-7">
          <p className="text-2xl font-bold">Make your mark</p>
          <p className="text-md text-gray-400 mt-1">Design your instant NFT</p>
          <div
            className="border-dashed rounded-xl
          border-4 border-gray-200 flex flex-col
          justify-center items-center outline-none
          mt-10 w-[300px] h-[300px]"
          >
            <SketchPad
              width={300}
              height={300}
              animate={true}
              size={size}
              color={color}
              fillColor={fill ? fillColor : ""}
              items={items}
              tool={tool}
              onCompleteItem={() => {}}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 pt-7 px-7">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium">Choose a Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="tools">
            <button
              style={tool == TOOL_PENCIL ? { fontWeight: "bold" } : undefined}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setTool(TOOL_PENCIL)}
            >
              Pencil
            </button>
            <button
              style={tool == TOOL_LINE ? { fontWeight: "bold" } : undefined}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setTool(TOOL_LINE)}
            >
              Line
            </button>
            <button
              style={tool == TOOL_ELLIPSE ? { fontWeight: "bold" } : undefined}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setTool(TOOL_ELLIPSE)}
            >
              Ellipse
            </button>
            <button
              style={
                tool == TOOL_RECTANGLE ? { fontWeight: "bold" } : undefined
              }
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setTool(TOOL_RECTANGLE)}
            >
              Rectangle
            </button>
            <button
              style={{}}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <div className="options">
            <label htmlFor="">size: </label>
            <input
              min="1"
              max="20"
              type="range"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
            />
          </div>
          <div className="options">
            <label htmlFor="">color: </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          {tool == TOOL_ELLIPSE || tool == TOOL_RECTANGLE ? (
            <div>
              <label htmlFor="">fill in:</label>
              <input
                type="checkbox"
                value={fill}
                style={{ margin: "0 8" }}
                onChange={(e) => setFill(e.target.checked)}
              />
              {fill ? (
                <span>
                  <label htmlFor="">with color:</label>
                  <input
                    type="color"
                    value={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                  />
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div className="justify-items-end">
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#1079AC] text-white text-md font-medium p-2 rounded w-28 lg:w-44 float-right outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sketch;
