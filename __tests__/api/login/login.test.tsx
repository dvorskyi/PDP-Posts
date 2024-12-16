import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";
import { POST } from "@/app/api/login/route";
import { mockAccessToken, mockUser } from "@/test-utils/mocks/data";

jest.mock("@/lib/prisma", () => ({
  user: {
    findFirst: jest.fn(),
  },
}));
jest.mock("bcrypt");
jest.mock("@/lib/jwt");

describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully login with correct credentials', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (signJwtAccessToken as jest.Mock).mockReturnValue(mockAccessToken);

    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'test@example.com',
        password: 'password123'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual({
      ...mockUser,
      password: undefined,
      accessToken: mockAccessToken
    });
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: 'test@example.com' }
    });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(signJwtAccessToken).toHaveBeenCalled();
  });

  it('should return 401 for incorrect password', async () => {

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'test@example.com',
        password: 'wrongpassword'
      })
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
  });

  it('should return 401 for non-existent user', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'nonexistent@example.com',
        password: 'password123'
      })
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: 'nonexistent@example.com' }
    });
  });

  it('should handle invalid JSON in request body', async () => {
    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: 'invalid-json'
    });
  });
});
