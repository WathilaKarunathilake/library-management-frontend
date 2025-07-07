import { borrowBookApi, getBorrowedBooksApi, returnBookApi } from "@/features/LibraryAPI";
import type { BookData } from "@/models/BookModels";
import { getToken } from "@/storage/Storage";
import { getUserIdFromToken } from "@/utils/jwt";

export const borrowBooks = async (bookId: string): Promise<boolean> => {
  const token = getToken();
  if (!token) {
    throw new Error("Invalid user token. Cannot get member ID.");
  }

  const memberId = getUserIdFromToken(token);
  if (!memberId) {
    throw new Error("Invalid user token. Cannot get member ID.");
  }

  const borrowRequest = {
    bookId,
    memberId,
  };
  const response = await borrowBookApi(borrowRequest);

  if (!response.data.success) {
    throw new Error(response.data.data || "Failed to borrow book");
  }

  return response.data.success;
};


export const returnBooks = async (bookId: string): Promise<boolean> => {
  try {
    const token = getToken();
    if (!token) {
        throw new Error("Invalid user token. Cannot get member ID.");
    }

    const memberId = getUserIdFromToken(token);
    if (!memberId) {
        throw new Error("Invalid user token. Cannot get member ID.");
    }


    const returnRequest = {
      bookId,
      memberId,
    };

    const response = await returnBookApi(returnRequest);

    if (!response.data.success) {
      throw new Error(response.data.data || "Failed to return book");
    }

    return response.data.success;
  } catch (error: any) {
    throw new Error(error?.message || "Returning book failed");
  }
};

export const getBorrowedBooksService = async (): Promise<BookData[]> => {
  try {
    const token = getToken();
    if (!token) {
        throw new Error("Invalid user token. Cannot get member ID.");
    }

    const memberId = getUserIdFromToken(token);
    if (!memberId) {
        throw new Error("Invalid user token. Cannot get member ID.");
    }

    const response = await getBorrowedBooksApi(memberId);

    if (!response.data.success) {
      throw new Error(response.data.data || "Failed to get borrowed book");
    }

    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Borrowed book failed");
  }
};
