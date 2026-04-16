import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    apellido: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (valor) => {
          return;
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            valor,
          );
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
          // se cambia a 64 caracteres maximo para soportar hash
          return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,64}$/.test(
            valor,
          );
        },
      },
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 30,
    },
    plan: {
      type: String,
      enum: ["ninguno", "musculacion", "clases", "full"],
      default: "ninguno",
    },
    fechaAltaPlan: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

// el nombre del modelo va en SINGULAR
const User = mongoose.model("user", userSchema);

export default User;
