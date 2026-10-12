import { describe, expect, test } from "bun:test";

import { authErrorMessage } from "./auth-error-message";

describe("authErrorMessage", () => {
    test("localizes message-only rate-limit responses", () => {
        expect(
            authErrorMessage({
                status: 429,
                message: "Too many requests. Please try again later.",
            }),
        ).toBe("For mange forsøk. Vent litt og prøv igjen.");
    });

    test("preserves known code-specific messages", () => {
        expect(
            authErrorMessage({
                status: 429,
                code: "ACCOUNT_TEMPORARILY_LOCKED",
                message: "Too many requests",
            }),
        ).toBe(
            "For mange forsøk. Brukeren er låst en liten stund. Prøv igjen senere.",
        );
    });

    test("still passes through non-rate-limit backend messages", () => {
        expect(authErrorMessage({ message: "E-posten finnes allerede." })).toBe(
            "E-posten finnes allerede.",
        );
    });
});
