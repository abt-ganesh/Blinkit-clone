"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  address: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    alert("Order placed successfully!");
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md space-y-4 p-4"
    >
      <input {...register("name")} placeholder="Name" />
      <input {...register("phone")} placeholder="Phone" />
      <textarea {...register("address")} placeholder="Address" />
      <button type="submit" className="w-full bg-green-600 py-2 text-white">
        Place Order
      </button>

      {formState.errors && <pre>{JSON.stringify(formState.errors)}</pre>}
    </form>
  );
}
