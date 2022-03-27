import {
  BooleanControl,
  clampVector,
  compositeKeyboardVector,
  Controller,
  gamepadAxisVector,
  VectorControl,
  whenButtonPressed,
  whenKeyPressed
} from "@hmans/controlfreak"

export const controller = new Controller()

controller
  .addControl("move", VectorControl)
  .addStep(compositeKeyboardVector("w", "s", "a", "d"))
  .addStep(gamepadAxisVector(0, 1))
  .addStep(clampVector(1))

controller
  .addControl("fire", BooleanControl)
  .addStep(whenKeyPressed(" "))
  .addStep(whenButtonPressed(0))
