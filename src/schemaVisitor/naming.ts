import { isString } from "lodash";

import {
  isBasic,
  isInterface,
  isStringUnion,
} from "./predicates";

import { Schema, VisitedType } from "./types";

const typeNotePrefix = /^type:/;

export const nameFromNotes = (schema: Schema): string =>
  schema._notes
    .filter(note => typeNotePrefix.test(note))
    .map(note => note.replace(typeNotePrefix, ""))[0];

export const toTypeName = (type: VisitedType): string => {
  if (isString(type.name)) {
    return type.name;
  }

  if (isBasic(type.class)) {
    return type.class.type;
  }

  if (isInterface(type.class)) {
    return type.name;
  }

  if (isStringUnion(type.class)) {
    return type.name;
  }

  return "Unknown";
};
