import { jwtDecode } from "jwt-decode";

export function decodeJwtPayload(token) {
  if (typeof token !== "string") return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    console.warn("JWT decode failed:", err);
    return null;
  }
}

export function isTokenValid(token) {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") {
    return false;
  }
  return Date.now() / 1000 < payload.exp;
}

export function getRolesFromToken(token) {
  const payload = decodeJwtPayload(token);
  return Array.isArray(payload?.roles) ? payload.roles : [];
}

export function getUserIdFromToken(token) {
  const payload = decodeJwtPayload(token);
  return typeof payload?.sub === "string" ? payload.sub : null;
}

export function getExpFromToken(token) {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") {
    return false;
  }
  return payload.exp;
}
