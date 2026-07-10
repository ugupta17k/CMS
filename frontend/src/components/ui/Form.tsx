import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export function InputForm() {
  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
  ]
  return (
    <form className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input id="form-email" type="email" placeholder="john@example.com" />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="form-address">Password</FieldLabel>
          <Input id="form-address" type="text" placeholder="Password" />
        </Field>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
