"use client";

import styled from "styled-components";

export const PostCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 16px 0;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const PostTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

export const IconsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

export const PostContent = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;