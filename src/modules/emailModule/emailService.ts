import db from "../../db.js";
const { WhiteList } = db.models;

export const whiteListService = async (email: string) => {
  return WhiteList.create({ email });
};
