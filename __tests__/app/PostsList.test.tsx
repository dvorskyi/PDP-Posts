import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostsList } from '@/app/posts/_components/PostsList/PostsList';
import { useModal } from '@/contexts/modal.context';
import { appAPI } from '@/api/axios';
import { mutate } from 'swr';
import { mockPosts } from '@/test-utils/mocks/data';

jest.mock('@/contexts/modal.context');
jest.mock('@/api/axios');
jest.mock('swr');

const mockOpenModal = jest.fn();

describe('PostsList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useModal as jest.Mock).mockReturnValue({ openModal: mockOpenModal });
    });

    it('renders posts correctly', () => {
        render(<PostsList posts={mockPosts} />);

        mockPosts.forEach(post => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
            expect(screen.getByText(post.content)).toBeInTheDocument();
        });

        expect(screen.getAllByLabelText('Edit')).toHaveLength(mockPosts.length);
        expect(screen.getAllByLabelText('Delete')).toHaveLength(mockPosts.length);
    });

    it('handles edit button click correctly', () => {
        render(<PostsList posts={mockPosts} />);

        const editButtons = screen.getAllByLabelText('Edit');
        fireEvent.click(editButtons[0]);

        expect(mockOpenModal).toHaveBeenCalledWith({
            type: 'POST',
            headerTitle: 'Edit Post',
            size: 'medium',
            params: {
                post: mockPosts[0]
            }
        });
    });

    it('handles delete button click correctly', async () => {
        (appAPI.delete as jest.Mock).mockResolvedValue({ status: 200 });
        
        render(<PostsList posts={mockPosts} />);

        const deleteButtons = screen.getAllByLabelText('Delete');
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(appAPI.delete).toHaveBeenCalledWith('/api/posts/1');
        });

        expect(mutate).toHaveBeenCalledWith('/api/posts');
    });

    it('does not mutate data if delete request fails', async () => {
        (appAPI.delete as jest.Mock).mockResolvedValue({ status: 400 });
        
        render(<PostsList posts={mockPosts} />);

        const deleteButtons = screen.getAllByLabelText('Delete');
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(appAPI.delete).toHaveBeenCalledWith('/api/posts/1');
        });

        expect(mutate).not.toHaveBeenCalled();
    });

    it('renders empty list when no posts are provided', () => {
        render(<PostsList posts={[]} />);
        
        expect(screen.queryByTestId('post-card-1')).not.toBeInTheDocument();
    });
});